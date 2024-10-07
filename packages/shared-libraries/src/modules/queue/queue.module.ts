/* eslint-disable max-classes-per-file */
import { DynamicModule, Global, Injectable, Module } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bull';
import { KeepJobsOptions, type Queue, QueueOptions } from 'bull';
import { SystemSettingService } from '../system-setting';
import { isNodeEnv, NODE_ENV } from '../../utils';

@Global()
@Module({})
export class QueueModule {
  static async register(
    name: string,
    options: QueueOptions | ((settingService: SystemSettingService) => Promise<QueueOptions>) = {},
  ): Promise<DynamicModule> {
    const modules: DynamicModule[] = [];

    @Module({})
    class DummyModule {}

    @Injectable()
    class DummyProvider {
      constructor(@InjectQueue(name) private queue: Queue) {
        if (!isNodeEnv(NODE_ENV.TEST)) {
          setInterval(async () => {
            const jobs = await this.queue.getJobs(['completed', 'failed']);
            // eslint-disable-next-line no-restricted-syntax
            for (const job of jobs) {
              if (!job) {
                continue;
              }
              const removeOnComplete =
                job.opts && job.opts.removeOnComplete && (<KeepJobsOptions>job.opts.removeOnComplete).age;
              const removeOnFail = job.opts && job.opts.removeOnFail && (<KeepJobsOptions>job.opts.removeOnFail).age;
              if (
                removeOnComplete &&
                Date.now() - job.finishedOn >= removeOnComplete * 1000 &&
                // eslint-disable-next-line no-await-in-loop
                (await job.isCompleted())
              ) {
                job.remove();
              } else if (
                removeOnFail &&
                job.attemptsMade === job.opts.attempts &&
                Date.now() - job.finishedOn >= removeOnFail * 1000
              ) {
                job.remove();
              }
            }
          }, 5000);
        }
      }
    }

    modules.push({
      module: DummyModule,
      providers: [DummyProvider],
    });

    modules.push(
      BullModule.registerQueueAsync({
        useFactory: async (settingService: SystemSettingService) => {
          if (typeof options === 'function') {
            options = await options(settingService);
          }
          options.settings = options.settings || {};
          options.settings.backoffStrategies = options.settings.backoffStrategies || {};
          options.settings.backoffStrategies['attempt*min'] = (attemptsMade: number) => attemptsMade * 60 * 1000;
          options.redis = {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          };
          return options;
        },
        inject: [SystemSettingService],
        name,
      }),
    );

    return {
      global: true,
      imports: modules,
      module: QueueModule,
      exports: modules,
    };
  }
}
