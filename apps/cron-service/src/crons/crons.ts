/* eslint-disable max-len */
import cron from 'node-cron';
import request from 'request-promise';
import { CronExpression } from './cron.expression.enum';
import JobsList from './jobs.list';
import { SERVER_KEY } from './server.key.enum';

const ENVS = {
  VERSION: process.env.VERSION,
  PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
  TRANSACTION_SERVICE_URL: process.env.TRANSACTION_SERVICE_URL,
  RATE_SERVICE_URL: process.env.RATE_SERVICE_URL,
  ON_OFF_RAMP_URL: process.env.ON_OFF_RAMP_URL,
  TRAFFIC_PROTECTION_ENGINE_URL: process.env.TRAFFIC_PROTECTION_ENGINE_URL,
};

export default class CronRun {
  constructor() {
    this.run().catch(console.error);
    console.log('Adding jobs list', JSON.stringify({ JobsList }));
  }

  async run() {
    const MISSING_ENVS = Object.keys(ENVS).reduce((prev, name) => {
      if (!ENVS[name as keyof typeof ENVS]) prev.push(name);

      return prev;
    }, [] as string[]);

    if (MISSING_ENVS.length > 0) {
      console.error(`Env(s) not found: ${MISSING_ENVS}`);

      process.exit(1);
    }

    for (const cronExpression in JobsList) {
      if (!Object.prototype.hasOwnProperty.call(JobsList, cronExpression)) continue;

      const servers = JobsList[cronExpression as CronExpression];

      if (!servers) continue;

      const serverKeys = Object.keys(servers) as SERVER_KEY[];

      const urls = serverKeys
        .reduce<string[]>((prev, serverUrl) => prev.concat(servers[serverUrl]), [])
        .filter((url) => !!url);

      if (urls.length === 0) continue;

      cron.schedule(cronExpression, () =>
        Promise.all(
          urls.map((url) => request.post(url).catch((error: any) => console.error(`error in ${url}:`, error))),
        ).then(() => {
          console.log(`Job ${cronExpression} Done`);
        }),
      );
    }
  }
}
