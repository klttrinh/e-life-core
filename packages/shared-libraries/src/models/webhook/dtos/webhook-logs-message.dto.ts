// import { IHeaders } from 'kafkajs';

export class WebhookLogsMessageDto<T> {
  key: string;

  value: T;

  timestamp: string;

  size: number;

  attributes: number;

  offset: string;

  headers?: any; // changed from IHeaders to any to reduce any kind of problems
}
