import { Transport } from '@nestjs/microservices';
import { KafkaOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';
import { SASLOptions } from '@nestjs/microservices/external/kafka.interface';

const getKafkaConfigs = (): KafkaOptions => {
  /* const saslConfig = Boolean(process.env.KAFKA_USE_SASL)
    ? <SASLOptions>{
        mechanism: "aws",
        accessKeyId: process.env.KAFKA_ACCESS_KEY_ID,
        authorizationIdentity: process.env.KAFKA_AUTHORIZATION_IDENTITY,
        secretAccessKey: process.env.KAFKA_SECRET_ACCESS_KEY,
        sessionToken: process.env.KAFKA_SESSION_TOKEN,
      }
    : undefined; */
  return {
    transport: Transport.KAFKA,
    options: {
      client: {
        /* sasl: saslConfig, */
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKERS],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
        allowAutoTopicCreation: true,
      },
    },
  };
};

/* export { getKafkaConfigs }; */
