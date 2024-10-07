/* eslint-disable max-classes-per-file */
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import * as winston from 'winston';
import { LoggerOptions } from 'winston';
import { NODE_ENV, isDefined, isNodeEnv, nodeEnv } from '../utils';
// import { Logger } from 'winston';

const transports: winston.transport[] = [new winston.transports.Console()];

const config: LoggerOptions = {
  level: isNodeEnv(NODE_ENV.TEST) ? 'error' : 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  // defaultMeta: { service: process.env.PROJECT_NAME },
  exitOnError: false,
  transports,
};

const winstonLogger = winston.createLogger(config);

function strip(obj: any) {
  delete obj.transaction_public_key;
  delete obj.transaction_private_key;
  delete obj.withdraw_public_key;
  delete obj.api_key;
  delete obj.g2fa_secret;

  delete obj.transactionPublicKey;
  delete obj.transactionPrivateKey;
  delete obj.withdrawPublicKey;
  delete obj.apiKey;
  delete obj.g2faSecret;

  if (obj.merchant) {
    strip(obj.merchant);
  }
}

function stripPrivateInfos(objects: any[], message: string) {
  // message added to locate the log and fix it
  if (!objects) {
    return;
  }
  const res = [];
  for (let obj of objects.filter((o) => !!o)) {
    if (typeof obj === 'object') {
      if (obj.methods) {
        if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
          try {
            throw new InternalServerErrorException(
              `methods field should not exist in the root of what is being logged, error message: ${message}`,
            );
          } catch (e) {
            winstonLogger.error(e);
          }
        }
      }
      obj = { ...obj };
      strip(obj);
    }
    res.push(obj);
  }
  return res;
}

export class AppLogger {
  public static readonly winstonLoggerConfig = config;

  private readonly logger: Logger;

  constructor(name: string) {
    this.logger = new Logger(name);
  }

  public info(message: any, ...params: any): void {
    if (nodeEnv() === NODE_ENV.TEST) {
      return;
    }
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.info(message, { content: params });
    } else {
      this.logger.log(message, ...params);
    }
  }

  public warn(message: any, ...params: any): void {
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.warn(message, { content: params });
    } else {
      this.logger.warn(message, ...params);
    }
  }

  public error(message: any, ...params: any): void {
    params = stripPrivateInfos(params, message);
    let error: any = {};
    if (message instanceof Error) {
      error = { name: message.name, errorMessage: message.message, stackTrace: message.stack };
    }
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.error(message, ...params, error);
    } else {
      this.logger.error(message, ...params, error);
    }
  }

  public debug(message: any, ...params: any): void {
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.debug(message, { content: params });
    } else {
      this.logger.debug(message, ...params);
    }
  }

  public identifiers(
    ...models: (Model<any> | { id: number | string; model: (new (...args: any[]) => Model<any>) | string })[]
  ): // eslint-disable-next-line no-use-before-define
  Builder {
    // eslint-disable-next-line no-use-before-define
    return new Builder(this, models);
  }
}

class Builder {
  constructor(
    protected logger: AppLogger,
    protected identifiers?: (
      | Model<any>
      | { id: number | string; model: (new (...args: any[]) => Model<any>) | string }
    )[],
  ) {}

  public info(message: any, ...params: any): void {
    if (nodeEnv() === NODE_ENV.TEST) {
      return;
    }
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.child(this.createIdentifiers()).info(message, { content: params });
    } else {
      this.logger.info(message, ...params);
    }
  }

  public debug(message: any, ...params: any): void {
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.child(this.createIdentifiers()).debug(message, { content: params });
    } else {
      this.logger.debug(message, ...params);
    }
  }

  public warn(message: any, ...params: any): void {
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.child(this.createIdentifiers()).warn(message, { content: params });
    } else {
      this.logger.warn(message, ...params);
    }
  }

  public error(message: any, ...params: any): void {
    params = stripPrivateInfos(params, message);
    if (!JSON.parse(process.env.USE_NEST_LOGGER)) {
      winstonLogger.child(this.createIdentifiers()).error(message, ...params);
    } else {
      this.logger.error(message, ...params);
    }
  }

  private createIdentifiers(): any {
    return (this.identifiers || [])
      .filter((i) => isDefined(i))
      .reduce((total, value) => {
        total[
          `${
            'model' in value
              ? typeof value.model === 'string'
                ? value.model
                : value.model.name
              : value.constructor.name
          }.id`
        ] = value.id;
        return total;
      }, {});
  }
}

/* constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

 public test(): void {
   setTimeout(() => {
     this.logger
       .child({
         userId: 2,
       })
       .info('some test 2');

     this.logger
       .child({
         userId: 2,
       })
       .info('some test 3')
       .notice({ data: 3 });

     logger2.log('some user 3');
     logger2.log('some user 4', { userId: 2 });
   }, 1000);
 } */
