import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { RELEASE_ENV, isReleaseEnv } from '../utils';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = process.hrtime();
    response.startedAt = startedAt;
    const { ip, method, originalUrl, body: requestBody, user } = request;
    const requestHeaders = request.headers;
    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const responseHeaders = response.getHeaders();
      const contentLength = response.get('content-length');
      const diff = process.hrtime(startedAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      const isItErrorLog =
        statusCode?.toString() && statusCode?.toString().length === 3 && statusCode?.toString()?.charAt(0) === '5';
      const isItWarningLog =
        statusCode?.toString() && statusCode?.toString().length === 3 && statusCode?.toString()?.charAt(0) === '4';

      const logObj: Record<string, unknown> = {
        method,
        ip,
        originalUrl,
        statusCode,
        statusMessage,
        responseTime,
        contentLength,
        userAgent,
        requestHeaders,
        requestBody,
        responseHeaders,
      };

      if (user) logObj.user = { id: user.id };

      if (!isReleaseEnv(RELEASE_ENV.DEVELOPMENT)) {
        if (isItErrorLog) {
          this.logger.error(logObj);
        } else if (isItWarningLog) {
          this.logger.warn(logObj);
        } else {
          this.logger.log(logObj);
        }
      } else {
        // eslint-disable-next-line max-len
        const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${responseTime}ms ${contentLength} - ${userAgent} ${ip}`;

        if (isItErrorLog) {
          this.logger.error(message);
        } else if (isItWarningLog) {
          this.logger.warn(message);
        } else {
          this.logger.log(message);
        }
      }
    });

    next();
  }
}
