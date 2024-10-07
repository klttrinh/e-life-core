import { registerAs } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import { Logger } from '@nestjs/common';
import { isNodeEnv, NODE_ENV } from '../utils';

const getEnv = (env: string, prefix: string): string => {
  return process.env[`${prefix}${env}`];
};

export default function getSequelizeConfig(namespace = 'database', envPrefix = ''): ReturnType<typeof registerAs> {
  return registerAs(namespace, () => {
    const sequelizeLoggingEnabled: boolean = JSON.parse(getEnv('SEQUELIZE_LOGGING', envPrefix) ?? 'false');
    const ssl: boolean = JSON.parse(getEnv('DB_SSL', envPrefix) ?? 'false');
    const logger = new Logger('Sequelize');
    const logQuery = (query: string): void => logger.log(query);
    return <SequelizeModuleOptions>{
      dialect: 'postgres',
      logging: sequelizeLoggingEnabled && logQuery,
      port: +getEnv('DB_PORT', envPrefix),
      username: getEnv('DB_USERNAME', envPrefix),
      password: getEnv('DB_PASSWORD', envPrefix),
      host: getEnv('DB_HOST', envPrefix),
      dialectOptions: {
        ssl: ssl
          ? {
              require: ssl,
              rejectUnauthorized: false,
            }
          : undefined,
      },
      database: getEnv('DB_NAME', envPrefix),
      synchronize: isNodeEnv(NODE_ENV.TEST),
      autoLoadModels: true,
    };
  });
}
