import { isDefined, pairCurrenciesMatch, reversePair, getPairCurrencies, pairInCorrectFormat } from './helpers.util';

describe('Helper Util', () => {
  it('should check if the given value is defined', () => {
    expect(isDefined('')).toBe(true);

    expect(isDefined(0)).toBe(true);

    expect(isDefined(false)).toBe(true);

    expect(isDefined({})).toBe(true);

    expect(isDefined([])).toBe(true);

    expect(isDefined(null)).toBe(false);

    expect(isDefined(undefined)).toBe(false);
  });

  /*
   * reversePair return given pair in reverse order
   * e.g 'USDT/BTC' => 'BTC/USDT'
   */
  it('should check reversePair functionality', () => {
    let pair = 'USDT/BTC';
    const reverse = reversePair(pair);
    expect(reverse).toEqual('BTC/USDT');

    try {
      pair = 'USDTBTC';
      reversePair(pair);
    } catch (err) {
      expect(err.message).toEqual(`pair '${pair}' is in incorrect format`);
    }

    try {
      pair = 'USDT/';
      reversePair(pair);
    } catch (err) {
      expect(err.message).toEqual(`pair '${pair}' is in incorrect format`);
    }
  });

  /*
   * pairCurrenciesMatch check if pair is same
   * e.g 'BTC/BTC' => true
   */
  it('should check pairCurrenciesMatch functionality', () => {
    const resultA = pairCurrenciesMatch('USDT/BTC');
    expect(resultA).toEqual(false);

    const resultB = pairCurrenciesMatch('BTC/BTC');
    expect(resultB).toEqual(true);
  });

  it('should check pairInCorrectFormat functionality', () => {
    const resultA = pairInCorrectFormat('USDT/BTC');
    expect(resultA).toEqual(true);

    const resultB = pairInCorrectFormat('USDT/BTC/LTC');
    expect(resultB).toEqual(false);
  });

  /*
   * getPairCurrencies return an array of pair currency
   */
  it('should check getPairCurrencies functionality', () => {
    const pair = getPairCurrencies('USDT/BTC');
    expect(pair[0]).toEqual('USDT');
    expect(pair[1]).toEqual('BTC');
  });

  it.todo('test getAllPrototypes when used');
});
