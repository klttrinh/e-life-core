import { convertSecondsToDuration } from './converters.util';

describe('test converts functionalities', () => {
  it('should test convertSecondsToDuration', () => {
    const result = convertSecondsToDuration(24 * 60 * 60 + 60 + 1);

    expect(result).toEqual('1 days, 0 hours, 1 minutes, 1 seconds');
  });
});
