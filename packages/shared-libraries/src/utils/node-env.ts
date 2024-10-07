export enum NODE_ENV {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

/**
 * Gets the current NODE_ENV.
 * @returns The current NODE_ENV.
 * @example
 * releaseEnv(); // => 'production'
 * @example
 * releaseEnv(); // => 'development'
 * @example
 * releaseEnv(); // => 'test'
 */
export function nodeEnv(): NODE_ENV {
  return (process.env.NODE_ENV as NODE_ENV | undefined) ?? NODE_ENV.DEVELOPMENT;
}

/**
 * Checks whether the current NODE_ENV is the provided parameter.
 * @param expected The expected NODE_ENV.
 * @returns Whether the current NODE_ENV is same as expected.
 * @example
 * isReleaseEnv('production'); // => `true` if `process.env.NODE_ENV` is `'production'`, `false` otherwise.
 * @example
 * isReleaseEnv('development'); // => `true` if `process.env.NODE_ENV` is `'development'`, `false` otherwise.
 * @example
 * isReleaseEnv('test'); // => `true` if `process.env.NODE_ENV` is `'test'`, `false` otherwise.
 */
export function isNodeEnv(expected: NODE_ENV): boolean {
  return nodeEnv() === expected;
}
