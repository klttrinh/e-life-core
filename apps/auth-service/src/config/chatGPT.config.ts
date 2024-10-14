import { registerAs } from '@nestjs/config';
import { env } from 'process';

export interface chatGPTConfig {
  GITHUB_TOKEN: string;
}

export const chatGPTConfig = registerAs(
  'chatGPT',
  (): chatGPTConfig => ({
    GITHUB_TOKEN: env.GITHUB_TOKEN,
  }),
);
