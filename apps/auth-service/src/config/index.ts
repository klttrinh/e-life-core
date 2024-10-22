import { type DatabaseShareConfig } from '@e-life/share-libraries';
import { type chatGPTConfig } from './chatGPT.config';

export interface Config {
  databaseShare: DatabaseShareConfig;
  chatGPT: chatGPTConfig;
}

export * from './database-share.config';
export * from './chatGPT.config';
