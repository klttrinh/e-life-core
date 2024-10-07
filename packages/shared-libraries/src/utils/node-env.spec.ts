import { isNodeEnv, nodeEnv, NODE_ENV } from './node-env';

describe('nodeEnv', () => {
  it('should return "test"', () => {
    expect(nodeEnv()).toBe(NODE_ENV.TEST);
  });
});

describe('isNodeEnv', () => {
  it.each([NODE_ENV.TEST])('should return true', (expected) => {
    expect(isNodeEnv(expected)).toBe(true);
  });

  it.each([NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION])('should return false (%s)', (expected) => {
    expect(isNodeEnv(expected)).toBe(false);
  });
});
