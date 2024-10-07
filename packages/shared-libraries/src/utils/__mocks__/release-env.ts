export enum RELEASE_ENV {
  PRODUCTION = 'production',
  PRE_PRODUCTION = 'pre-production',
  SANDBOX = 'sandbox',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
}

export const releaseEnv = jest
  .fn()
  .mockImplementation(
    (): RELEASE_ENV => (process.env.RELEASE_ENV as RELEASE_ENV | undefined) ?? RELEASE_ENV.DEVELOPMENT,
  );

export const isReleaseEnv = jest.fn().mockImplementation((expected: RELEASE_ENV): boolean => releaseEnv() === expected);
