import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import Client from 'ioredis';
import Redlock from 'redlock';
import _ from 'lodash';
import { AppLogger } from '../../logs/app.logger';
import { sleep } from '../../utils';

const HEALTH_CHECK_INTERVAL = 60 * 1000;
const LOCK_ACQUIRE_SLEEP_DURATION = 500;
const LOCK_MAX_TTL = 5 * 60 * 1000;
const MAX_EXTENSIONS = 5;

declare global {
  // eslint-disable-next-line no-var, vars-on-top, no-use-before-define
  var lockService: LockService;
}

type ValueType = { tag: string; date: number; clientToken: string; extensions: number };

@Injectable()
export class LockService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new AppLogger(LockService.name);

  private readonly client;

  private healthCheckIntervalId;

  constructor(private configService: ConfigService) {
    global.lockService = this;
    this.client = new Client({
      host: configService.get('REDIS_HOST'),
      port: +configService.get('REDIS_PORT'),
    });
  }

  onApplicationBootstrap(): any {
    this.healthCheckIntervalId = setInterval(() => this.runHealthCheck(), HEALTH_CHECK_INTERVAL);
    this.runHealthCheck();
  }

  public async auto<T>(
    lockTags: string | string[],
    cb: () => Promise<T>,
    options: { settings?: Redlock['settings']; duration?: number } = {},
  ): Promise<T> {
    options.duration = options.duration || 10000;

    const tags = _.uniq(
      typeof lockTags === 'string'
        ? [lockTags]
        : Array.isArray(lockTags)
        ? lockTags.map((t) => String(t))
        : [String(lockTags)],
    );

    const { release } = await this.getWriteLockWithPriority(tags);

    try {
      return await cb();
    } finally {
      await release();
    }
  }

  private encodeValue(data: ValueType): string {
    return JSON.stringify(data);
  }

  private decodeValue(data: string): ValueType {
    return JSON.parse(data);
  }

  private async fetchIndexes(values: string[]) {
    const res: number[] = [];
    for (const val of values) {
      const listKey = this.generateListKey(this.decodeValue(val).tag);
      res.push(await this.client.lpos(listKey, val));
    }
    return res;
  }

  private async runHealthCheck() {
    const allListKeys = await this.getAllLists();
    const now = Date.now();
    for (const listKey of allListKeys) {
      const list = await this.client.lrange(listKey, 0, -1);
      for (const listVal of list) {
        const value = this.decodeValue(listVal);
        if (now - value.date >= LOCK_MAX_TTL) {
          this.logger.debug('lock-service', 'force deleting', value);
          await this.deleteLocks([listVal]);
        }
      }
    }
  }

  private generateListKey(tag: string) {
    return `:lock-queue-list:${tag}`;
  }

  private async getAllLists(): Promise<string[]> {
    return this.client.keys(':lock-queue-list:*');
  }

  private async deleteLocks(values: string[]) {
    for (const listVal of values) {
      const value = this.decodeValue(listVal);
      const listKey = this.generateListKey(value.tag);
      await this.client.lrem(listKey, 0, listVal); // 0 will remove all occurrences of listVal
    }
  }

  private async extendLocks(values: string[]) {
    values = [...values];
    for (const val of values) {
      const listKey = this.generateListKey(this.decodeValue(val).tag);
      const index = await this.client.lpos(listKey, val);
      if (index === null) {
        throw new Error(`Error when trying to get lock which request got deleted when trying to extend lock`);
      }
      const value = this.decodeValue(val);
      if (value.extensions < MAX_EXTENSIONS) {
        value.date = Date.now();
        value.extensions += 1;
        values.splice(values.indexOf(val), 1, this.encodeValue(value));
        await this.client.lset(listKey, index, this.encodeValue(value));
      }
    }
    return values;
  }

  private async getWriteLockWithPriority(tags: string[]) {
    let values: string[] = [];
    for (const tag of tags) {
      const value = this.encodeValue({ tag, date: Date.now(), clientToken: randomUUID(), extensions: 0 });
      await this.client.rpush(this.generateListKey(tag), value);
      values.push(value);
    }
    while (true) {
      const indexes = await this.fetchIndexes(values);
      if (indexes.some((i) => i === null)) {
        throw new Error(`Error when trying to get locks for ${tags} , lock request got deleted before acquiring`);
      }
      if (!indexes.some((i) => i !== 0)) {
        break;
      }
      await sleep(LOCK_ACQUIRE_SLEEP_DURATION);
    }

    values = await this.extendLocks(values);

    const extender = setInterval(async () => {
      try {
        values = await this.extendLocks(values);
      } catch (e) {
        this.logger.error(e);
        clearInterval(extender);
      }
    }, LOCK_MAX_TTL / 2);

    return {
      release: () => {
        clearInterval(extender);
        return this.deleteLocks(values);
      },
    };
  }

  public async onApplicationShutdown(): Promise<any> {
    if (this.healthCheckIntervalId != null) clearInterval(this.healthCheckIntervalId);

    return this.client.quit();
  }
}
