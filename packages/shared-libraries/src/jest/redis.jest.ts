// eslint-disable-next-line import/no-extraneous-dependencies
import { RedisMemoryServer } from 'redis-memory-server';
import 'dotenv/config';

export const NO_REDIS = process.env.NO_REDIS === '1';

export default new RedisMemoryServer({
  autoStart: false,
  binary: {
    version: '7.0.5',
  },
});
