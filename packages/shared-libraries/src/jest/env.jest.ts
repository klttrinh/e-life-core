import { NODE_ENV, RELEASE_ENV } from '../utils';

/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line @typescript-eslint/no-namespace,@typescript-eslint/no-unused-vars
declare namespace NodeJS {
  interface Global {
    __DB_NAME_PREFIX__: string;

    __DB_HOST__: string;
    __DB_PORT__: number;
    __DB_USERNAME__: string;
    __DB_PASSWORD__: string;

    __REDIS_HOST__: string;
    __REDIS_PORT__: number;
  }
}

process.env.NODE_ENV = NODE_ENV.TEST;
process.env.RELEASE_ENV = RELEASE_ENV.DEVELOPMENT;

if (global.__DB_NAME_PREFIX__) {
  process.env.DB_NAME = `${global.__DB_NAME_PREFIX__}-database-${process.env.JEST_WORKER_ID}`;
}
if (global.__DB_HOST__) {
  // Set the test Postgres service connection parameters
  process.env.DB_HOST = global.__DB_HOST__;
  process.env.DB_PORT = `${global.__DB_PORT__}`;
  process.env.DB_USERNAME = global.__DB_USERNAME__;
  process.env.DB_PASSWORD = global.__DB_PASSWORD__;
}

if (global.__REDIS_HOST__) {
  // Set the test Redis service connection parameters
  process.env.REDIS_HOST = global.__REDIS_HOST__;
  process.env.REDIS_PORT = `${global.__REDIS_PORT__}`;
}

process.env.REDIS_DB = process.env.JEST_WORKER_ID;

process.env.USE_NEST_LOGGER = 'false';
process.env.DB_SSL = 'false';
