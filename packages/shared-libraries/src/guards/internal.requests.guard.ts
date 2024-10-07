import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';
import * as requestIp from '@supercharge/request-ip';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalRequestsGuard implements CanActivate {
  private logger = new Logger(InternalRequestsGuard.name);

  constructor(
    private configService: ConfigService,
    private whiteList = configService.get('INTERNAL_APIS_WHITELISTED_IPS').split(',') as string[],
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request: Request = ctx.switchToHttp().getRequest();
    const ip = requestIp.getClientIp(request);
    if (request.path.includes('/internal/') && !this.isLocalIp(ip)) {
      if (this.whiteList.includes(ip) || this.whiteList.includes('*')) {
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { connection, socket, route, res, server, client, ...rest } = request;
      this.logger.warn('Illegal access to internal apis blocked', {
        ip,
        request: rest,
      });
      return false;
    }
    return true;
  }

  private isLocalIp(ip: string): boolean {
    const parts = ip.split('.');
    return (
      parts[0] === '10' ||
      (parts[0] === '172' && parseInt(parts[1], 10) >= 16 && parseInt(parts[1], 10) <= 31) ||
      (parts[0] === '192' && parts[1] === '168') ||
      ip === '127.0.0.1' ||
      ip === '::ffff:127.0.0.1' ||
      ip === '::1' ||
      ip.indexOf('localhost') !== -1
    );
  }
}
