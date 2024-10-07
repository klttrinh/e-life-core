import { isReleaseEnv, releaseEnv, RELEASE_ENV } from './release-env';

describe('releaseEnv', () => {
  it('should return "development"', () => {
    expect(releaseEnv()).toBe(RELEASE_ENV.DEVELOPMENT);
  });
});

describe('isReleaseEnv', () => {
  it.each([RELEASE_ENV.DEVELOPMENT])('should return true', (expected) => {
    expect(isReleaseEnv(expected)).toBe(true);
  });

  it.each([RELEASE_ENV.STAGING, RELEASE_ENV.SANDBOX, RELEASE_ENV.PRE_PRODUCTION, RELEASE_ENV.PRODUCTION])(
    'should return false (%s)',
    (expected) => {
      expect(isReleaseEnv(expected)).toBe(false);
    },
  );
});
