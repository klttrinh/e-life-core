/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { type Config } from 'jest';
// eslint-disable-next-line import/no-relative-packages
import BaseConfig from '../../jest.config';

export default {
  ...BaseConfig,
  displayName: 'Shared Libraries',
  globalSetup: '<rootDir>/src/jest/setup.jest.ts',
  globalTeardown: '<rootDir>/src/jest/teardown.jest.ts',
  setupFiles: ['<rootDir>/src/jest/env.jest.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/jest/lifecycles.jest.ts'],
} satisfies Config;
