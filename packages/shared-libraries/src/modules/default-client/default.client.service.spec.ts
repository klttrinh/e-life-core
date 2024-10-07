// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
it.todo('DefaultClientService');

/*
import { Test, TestingModule } from '@nestjs/testing';
import { INestMicroservice } from '@nestjs/common';
import { DefaultClientModule } from './default.client.module';
import { DefaultClientService } from './default.client.service';
import { Consumer, Kafka } from 'kafkajs';

describe('DefaultClientService', () => {
  let app: INestMicroservice;
  let consumer: Consumer;
  let service: DefaultClientService;
  jest.setTimeout(40000);

  process.env.KAFKA_CLIENT_ID = '1';
  process.env.KAFKA_GROUP_ID = '1';
  process.env.KAFKA_BROKERS = 'localhost:29092';
  const OLD_ENV = process.env;
  jest.resetModules(); // Most important - it clears the cache
  process.env = { ...OLD_ENV }; // Make a copy

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DefaultClientModule.register()],
      providers: [DefaultClientService],
      exports: [DefaultClientService],
    }).compile();

    app = module.createNestMicroservice(getKafkaConfigs());
    await app.init();
    service = module.get<DefaultClientService>(DefaultClientService);
  });

  afterAll(async () => {
    await app.close();
    consumer && (await consumer.disconnect());
  });

  it('send a request and receive by consumer', (done) => {
    const kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKERS],
      clientId: '2',
    });
    consumer = kafka.consumer({
      groupId: process.env.KAFKA_GROUP_ID,
      allowAutoTopicCreation: true,
    });
    consumer
      .subscribe({
        topic: 'transaction.create',
        fromBeginning: true,
      })
      .then(() =>
        consumer.run({
          eachMessage: async ({ message, topic, partition }) => {
            done();
          },
        }),
      )
      .then(() => consumer.connect())
      .then(() => service.request('transaction.create', '12312312'));
  });
});
*/
