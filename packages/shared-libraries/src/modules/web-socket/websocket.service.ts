/* eslint-disable class-methods-use-this */
import { Injectable, Logger } from '@nestjs/common';
import Pusher, { Response, TriggerParams } from 'pusher';
import { ConfigService } from '@nestjs/config';
import { releaseEnv } from '../../utils';
import { WebsocketEventsEnum } from './enums/websocket.events.enum';
import { HealthStatusReturnType } from '../../interfaces/health';

const USER_CHANNEL_PREFIX = 'private-user-channel-'; // 'private-user-channel-';
const TRANSACTION_CHANNEL_PREFIX = 'private-transaction-channel-'; // 'private-transaction-channel-';
const PRIVATE_ROLE_CHANNEL_PREFIX = 'private-role-channel'; // 'private-transaction-channel-';

@Injectable()
export class WebsocketService {
  private readonly logger = new Logger(WebsocketService.name);

  constructor(private configService: ConfigService) {}

  private pusher = new Pusher({
    appId: this.configService.get('PUSHER_APPID'),
    key: this.configService.get('PUSHER_KEY'),
    secret: this.configService.get('PUSHER_SECRET'),
    cluster: this.configService.get('PUSHER_CLUSTER'),
    useTLS: true,
  });

  public getUserChannelName(userId: string) {
    return `${USER_CHANNEL_PREFIX}${userId}-${releaseEnv()}`;
  }

  public getTransactionChannelName(transactionId: string) {
    return `${TRANSACTION_CHANNEL_PREFIX}${transactionId}-${releaseEnv()}`;
  }

  public authorizeChannel(channelId: string, socketId: string, data?: Pusher.PresenceChannelData) {
    return this.pusher.authenticate(socketId, channelId, data);
  }

  public sendEventToUser<T>(
    userId: string,
    eventName: WebsocketEventsEnum,
    data: T,
    options: TriggerParams = {},
  ): Promise<void> {
    return this.sendEventToChannel(this.getUserChannelName(userId), eventName, data, options);
  }

  public sendEventToRoleChannel<T>(
    roleId: number,
    eventName: WebsocketEventsEnum,
    data: T,
    { identifier }: { identifier: number | 'all' } = { identifier: 'all' },
  ) {
    identifier = identifier || 'all';
    return this.sendEventToChannel(
      `${PRIVATE_ROLE_CHANNEL_PREFIX}-${roleId}-${identifier}-${releaseEnv()}`,
      eventName,
      data,
    );
  }

  public isUserChannel(channelId: string, userId?: string) {
    if (!channelId) {
      return false;
    }
    if (userId) {
      return channelId === this.getUserChannelName(userId);
    }
    return channelId.startsWith(USER_CHANNEL_PREFIX);
  }

  public sendTransactionEvent<T>(
    transactionId: string,
    eventName: WebsocketEventsEnum,
    data: T,
    options: TriggerParams = {},
  ): Promise<void> {
    return this.sendEventToChannel(this.getTransactionChannelName(transactionId), eventName, data, options);
  }

  public isTransactionChannel(channelId: string, transactionId?: string) {
    if (!channelId) {
      return false;
    }
    if (transactionId) {
      return channelId === this.getTransactionChannelName(transactionId);
    }
    return channelId.startsWith(TRANSACTION_CHANNEL_PREFIX);
  }

  // eslint-disable-next-line consistent-return
  public async sendEventToChannel<T>(
    channelNames: string | string[],
    eventName: string,
    data: T,
    options: TriggerParams = {},
  ): Promise<void> {
    this.logger.log(`sending ${eventName} to ${channelNames}`);
    try {
      await this.pusher.trigger(channelNames, eventName, data, options);
    } catch (e) {
      this.logger.error(`failed to send event ${eventName}`, e);
    }
  }

  // eslint-disable-next-line consistent-return
  public sendAsBatch(events: Array<Pusher.BatchEvent>): Promise<Response> {
    try {
      return this.pusher.triggerBatch(events);
    } catch (e) {
      this.logger.error(`failed to send batch events`, e);
    }
  }

  // eslint-disable-next-line consistent-return, camelcase
  public async getChannelsList({ filter_by_prefix }: { filter_by_prefix?: string } = {}): Promise<{
    [key: string]: { user_count: number };
  }> {
    const res = await this.pusher.get({
      path: '/channels',
      // eslint-disable-next-line camelcase
      params: { filter_by_prefix },
    });
    if (res.status === 200) {
      const body = await res.json();
      return body.channels;
    }
  }

  // eslint-disable-next-line consistent-return
  public async getChannelInfo(channelName: string): Promise<{
    occupied: boolean;
    user_count: number;
    subscription_count: number;
  }> {
    const res = await this.pusher.get({ path: `/channels/${channelName}` });
    if (res.status === 200) {
      const body = await res.json();
      return body.channels;
    }
  }

  // eslint-disable-next-line consistent-return
  public async getUsersInChannel(channelName: string): Promise<{ id: string }[]> {
    const res = await this.pusher.get({
      path: `/channels/${channelName}/users`,
    });
    if (res.status === 200) {
      const body = await res.json();
      return body.users;
    }
  }

  public async healthStatus(): Promise<HealthStatusReturnType> {
    const status = (await this.pusher
      .trigger('test-channel', 'test-event', {})
      .then((res) => (res.status === 200 ? 'up' : 'down'))
      .catch(() => 'down')) as any;

    return { pusher: { status } };
  }
}
