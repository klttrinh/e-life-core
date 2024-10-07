import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

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
}
