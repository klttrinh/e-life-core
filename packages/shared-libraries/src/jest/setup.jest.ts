/* eslint-disable no-multi-assign,no-underscore-dangle */
import type { Config } from '@jest/types';
import { kebabCase } from 'lodash';
import { NO_POSTGRES, startPostgres } from './postgres.jest';
import { setupDB } from './database.jest';
import REDIS, { NO_REDIS } from './redis.jest';
import teardownJest from './teardown.jest';

export default async function setupJest(globalConfig: Config.GlobalConfig, projectConfig: Config.ProjectConfig) {
  const DB_NAME_PREFIX = kebabCase(projectConfig.displayName.name);

  projectConfig.globals.__DB_NAME_PREFIX__ = DB_NAME_PREFIX;

  try {
    const promises: Promise<unknown>[] = [];

    if (NO_POSTGRES) {
      promises.push(setupDB(DB_NAME_PREFIX, globalConfig.maxWorkers));
    } else {
      promises.push(
        startPostgres(`${DB_NAME_PREFIX}-database-1`).then(async (postgres) => {
          process.env.DB_HOST = projectConfig.globals.__DB_HOST__ = postgres.getHost();
          process.env.DB_PORT = `${(projectConfig.globals.__DB_PORT__ = postgres.getPort())}`;
          process.env.DB_NAME = postgres.getDatabase();
          process.env.DB_USERNAME = projectConfig.globals.__DB_USERNAME__ = postgres.getUsername();
          process.env.DB_PASSWORD = projectConfig.globals.__DB_PASSWORD__ = postgres.getPassword();

          return setupDB(DB_NAME_PREFIX, globalConfig.maxWorkers, 1);
        }),
      );
    }

    if (!NO_REDIS) {
      projectConfig.globals.__REDIS_HOST__ = '127.0.0.1';
      projectConfig.globals.__REDIS_PORT__ = 6379;
    }

    await Promise.all(promises);
  } catch (e) {
    await teardownJest();

    throw e;
  }
}
