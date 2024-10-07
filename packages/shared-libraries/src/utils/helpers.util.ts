import crypto from 'crypto';
import { AllCurrenciesEnum, CryptoEnum, FiatEnum } from '../models';
import { money } from './money.util';

/**
 * Delays to rest of the process in the given scope for the given time.
 * @param milliseconds The number of milliseconds to delay the process (sleep).
 */
export async function sleep(milliseconds: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export const signRequest = (privateKey: string, body: object | null = null): { signature: string; nonce: string } => {
  const nonce = crypto.randomUUID();

  return {
    signature: crypto.sign('RSA-SHA512', Buffer.from(JSON.stringify(body) + nonce), privateKey).toString('base64'),
    nonce,
  };
};

export function calculateRateWithSpread(rate: number, spread = 0): number {
  // const isCryptoLeft = pair.split('/').find((c) => CryptoEnum[c]) === pair.split('/')[0];
  spread *= 100;
  const extra = money(money(spread).divide(100)).multiply(rate);
  /* if (isCryptoLeft) {
    extra.multiply(-1);
  } */
  rate -= Number(extra.value());
  return rate;
}

/**
 * Checks whether the value is defined or not. (anything other than `undefined` or `null`)
 * @param value The value to check.
 * @returns Whether the value is defined or not.
 * @example
 * isDefined(1); // => true
 * @example
 * isDefined(false); // => true
 * @example
 * isDefined(null); // => false
 * @example
 * isDefined(undefined); // => false
 */
export function isDefined(value: any): boolean {
  return value != null;
}

export function isValidNumberString(value: any): boolean {
  return isDefined(value) && !Number.isNaN(Number(value));
}

export function reversePair(pair: string): string {
  if (pair.split('/').length !== 2) {
    throw new Error(`pair '${pair}' is in incorrect format`);
  }
  const arr = pair.split('/');

  if (!arr[0] || !arr[1]) {
    throw new Error(`pair '${pair}' is in incorrect format`);
  }

  // throw an Error in this situation effect on other functions
  // if (arr[0] === arr[1]) {
  //   throw new Error(`pair '${pair}' is in incorrect format`);
  // }

  return `${arr[1]}/${arr[0]}`;
}

export function pairCurrenciesMatch(pair: string): boolean {
  return pair === reversePair(pair);
}

export function pairInCorrectFormat(pair: string): boolean {
  return pair.split('/').length === 2;
}

export function getPairCurrencies(pair: string): (FiatEnum | CryptoEnum)[] {
  return pair.split('/') as (FiatEnum | CryptoEnum)[];
}

export function getAllPrototypes(Class: any): any[] {
  const arr = [Class];
  const next = (child) => {
    const p = Object.getPrototypeOf(child);
    if (!p) {
      return false;
    }
    arr.push(p);
    return true;
  };
  while (next(arr[arr.length - 1])) {
    /* empty */
  }
  return arr;
}

export function snakeCaseString(text: string): string {
  return text
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join('_');
}

export function invertKeyValues<K extends string, V extends string | number>(obj: Record<K, V>): Record<V, K> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key])) as Record<V, K>;
}

export function isCrypto(currency: string): currency is CryptoEnum {
  return Object.values(CryptoEnum).includes(currency as CryptoEnum);
}

export function isFiat(currency: string): currency is FiatEnum {
  return Object.values(FiatEnum).includes(currency as FiatEnum);
}

export function isStableCoin(currency: string) {
  return [CryptoEnum.USDT, CryptoEnum.DAI, CryptoEnum.USDC, CryptoEnum.TUSD, CryptoEnum.USDTTR].includes(
    currency as CryptoEnum,
  );
}
