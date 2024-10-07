// import { IHeaders } from 'kafkajs';

/**
 * Kafka message data to object which is a generic class
 * you need to specify the generic value schema on your beloved consumer
 * use case:
 * blahblah(@Payload() message: KafkaMessageDto<WebhookLogMessageDto>){}
 */
/*
export class KafkaMessageDto<T> {
  key: string;
  value: T;
}
*/

export {};
