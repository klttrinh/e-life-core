import { Injectable, Inject, CACHE_MANAGER, Logger, OnApplicationShutdown } from '@nestjs/common';
import { type Cache } from 'cache-manager';
import { RedisClient } from 'redis';
import { promisify } from 'node:util';
import { IRate } from '../interfaces/rate';
import { isDefined } from '../utils';

@Injectable()
export class CacheService implements OnApplicationShutdown {
  private readonly logger = new Logger(CacheService.name);

  public get: Cache['get'];

  public reset: Cache['reset'];

  public set: Cache['set'];

  public del: Cache['del'];

  public store: Cache['store'];

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    this.store = cache.store;

    this.get = cache.get;
    this.set = cache.set;
    this.del = cache.del;
    this.reset = cache.reset;
  }

  public async getObject<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'object');
  }

  public async getString<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'string');
  }

  public async getNumber<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'number');
  }

  public async getBoolean<T>(key: string): Promise<T | undefined> {
    return this.getAndCheckType(key, 'boolean');
  }

  private async getAndCheckType<T>(
    key: string,
    type: 'string' | 'object' | 'boolean' | 'number',
  ): Promise<T | undefined> {
    const res = await this.get<T>(key);
    if (!isDefined(res)) {
      return res;
    }
    if (typeof res !== type) {
      this.logger.log(`type for key ${key} is not ${type} (${typeof res}) , returning undefined`);
      return undefined;
    }
    return res;
  }

  public getClient(): RedisClient {
    return (this.cache.store as any).getClient();
  }

  public async saveCurrency(currency: { id: number; currency_code: string }) {
    await this.cache.set(`currency-id-${currency.id}`, currency, { ttl: 0 });
    await this.cache.set(`currency-code-${currency.currency_code}`, currency, { ttl: 0 });
  }

  public async readCurrencyById<T>(id: number): Promise<T> {
    return this.getObject(`currency-id-${id}`);
  }

  public async readCurrencyByCode<T>(currencyCode: string): Promise<T> {
    return this.getObject(`currency-code-${currencyCode}`);
  }

  public async saveRate(rate: IRate) {
    return this.cache.set(rate.pair, JSON.stringify(rate), { ttl: 0 });
  }

  async readRate(pair: string): Promise<IRate | undefined> {
    const val = await this.cache.get<string>(pair);
    return val ? JSON.parse(val) : undefined;
  }

  public async clear() {
    await this.cache.reset();
  }

  public async onApplicationShutdown(): Promise<'OK'> {
    const client = this.getClient();

    return promisify(client.quit.bind(client))();
  }
}
