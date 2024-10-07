export enum RELEASE_ENV {
  PRODUCTION = 'production',
  PRE_PRODUCTION = 'pre-production',
  SANDBOX = 'sandbox',
  STAGING = 'staging',
  DEVELOPMENT = 'development',
}

/**
 * Gets the current deployment release environment.
 * @returns The current deployment release environment.
 * @example
 * releaseEnv(); // => 'development'
 * @example
 * releaseEnv(); // => 'staging'
 * @example
 * releaseEnv(); // => 'production'
 */
export function releaseEnv(): RELEASE_ENV {
  return (process.env.RELEASE_ENV as RELEASE_ENV | undefined) ?? RELEASE_ENV.DEVELOPMENT;
}

/**
 * Checks whether the current deployment release environment is the provided parameter.
 * @param expected The expected deployment release environment.
 * @returns Whether the current deployment release environment is same as expected.
 * @example
 * isReleaseEnv('development'); // => `true` if `process.env.RELEASE_ENV` is `'development'`, `false` otherwise.
 * @example
 * isReleaseEnv('staging'); // => `true` if `process.env.RELEASE_ENV` is `'staging'`, `false` otherwise.
 * @example
 * isReleaseEnv('production'); // => `true` if `process.env.RELEASE_ENV` is `'production'`, `false` otherwise.
 */
export function isReleaseEnv(expected: RELEASE_ENV): boolean {
  return releaseEnv() === expected;
}
