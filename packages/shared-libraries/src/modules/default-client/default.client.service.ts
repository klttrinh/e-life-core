import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ErrorLevelEnum, NotificationCreateDto, NotificationTypesEnum } from '../../models';
import { ServicesEnum } from '../../general';
import { InternalEventsEnum } from './enums/internal.events.enum';

@Injectable()
export class DefaultClientService {
  private readonly logger = new Logger(DefaultClientService.name);

  /* constructor(@Inject('KAFKA_CLIENT') private kafkaClient: ClientKafka) {}
    private readonly subscribes: Set<string> = new Set();

    async onModuleInit() {
      // await this.kafkaClient.connect();
    }
  */
  /**
   * Request will send a message to a Kafka topic and will trigger a callback for the response
   * @param event
   * @param data RequestPayload is a generic type and needs to be replaced by a DTO/Interface that you have
   * @returns Observable
   */
  // eslint-disable-next-line class-methods-use-this
  public request<TData, TResult = any>(event: string, data?: TData): Promise<TResult> {
    return axios
      .post(event, data)
      .then((r) => r.data)
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
        if (err instanceof HttpException) {
          throw err;
        }
        throw new HttpException(err.response.data, err.response.status);
      });
  }

  public sendNotification(data: {
    title: string;
    description: string;
    service: ServicesEnum;
    level: ErrorLevelEnum;
    recipientAdminIds?: NotificationCreateDto['recipientAdminIds'];
    recipientRoles?: NotificationCreateDto['recipientRoles'];
    recipientAdminEmails?: NotificationCreateDto['recipientAdminEmails'];
    actions?: NotificationCreateDto['actions'];
    additionalInfo?: NotificationCreateDto['additionalInfo'];
    merchantId?: number;
    type: NotificationTypesEnum;
  }) {
    return this.request(InternalEventsEnum.PAYMENT_GATEWAY_API.NOTIFICATIONS.CREATE, {
      message: data.title,
      details: data.description,
      recipientRoles: data.recipientRoles?.map((r) => Number(r)),
      actions: data.actions,
      type: data.type,
      merchantId: data.merchantId,
      recipientAdminIds: data.recipientAdminIds,
      recipientAdminEmails: data.recipientAdminEmails,
      additionalInfo: {
        ...data.additionalInfo,
        level: data.level,
        service: data.service,
      },
    } as NotificationCreateDto);
  }

  public sendExceptionErrorNotification(
    data: ({ error: Error; description?: string } | { description: string }) & {
      level: ErrorLevelEnum;
      service: ServicesEnum;
    } & { recipientRoles?: number[]; merchantId?: number; title?: string; extraData?: any },
  ) {
    const dto: Partial<NotificationCreateDto> = {
      details: data.description,
      type: NotificationTypesEnum.ERROR,
      recipientRoles: data.recipientRoles?.map((r) => Number(r)),
      merchantId: data.merchantId,
      additionalInfo: {
        extraData: data.extraData,
        level: data.level,
        service: data.service,
      },
    };
    if ('title' in data) {
      dto.message = data.title;
    }
    if ('error' in data) {
      if (!dto.message) {
        dto.message = data.error.name;
      }
      (dto.additionalInfo as any).exceptionStack = data.error.stack;
      if (!dto.details) {
        dto.details = data.error.message;
      }
    }
    return this.request(InternalEventsEnum.PAYMENT_GATEWAY_API.NOTIFICATIONS.CREATE, dto).catch(console.error);
  }
}
