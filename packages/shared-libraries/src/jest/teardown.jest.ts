import { stopPostgres, NO_POSTGRES } from './postgres.jest';
import REDIS, { NO_REDIS } from './redis.jest';

export default async function teardownJest() {
  const promises: Promise<unknown>[] = [];

  if (!NO_POSTGRES) promises.push(stopPostgres());

  if (!NO_REDIS) promises.push(REDIS.stop());

  return Promise.allSettled(promises);
}
