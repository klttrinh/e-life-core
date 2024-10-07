/* eslint-disable no-use-before-define */
import BigDecimal from 'js-big-decimal';
import { RoundingModes } from 'js-big-decimal/dist/node/roundingModes';
import { CryptoEnum, FiatEnum } from '../models';
import { isDefined, reversePair } from './helpers.util';
import { DefaultClientService } from '../modules/default-client/default.client.service';
import { InternalEventsEnum } from '../modules/default-client/enums/internal.events.enum';

const clientService = new DefaultClientService();

type CurrenciesType = CryptoEnum | FiatEnum;

// TODO: limit to Money & string after fixed the types for DECIMAL & BIGINT
type AmountType = Money<CurrenciesType> | string | number;

type ExtractedCurrencyType<Amount extends AmountType, Currency extends CurrenciesType> = Currency extends undefined
  ? Amount extends Money<CurrenciesType>
    ? ReturnType<Amount['getCurrency']>
    : undefined
  : Money<Currency>;

type MaybePromise<
  Amount extends AmountType,
  T extends CurrenciesType,
  MCT extends CurrenciesType,
  Extracted = ExtractedCurrencyType<Amount, T>,
> = Extracted extends undefined ? Money<MCT> : Promise<Money<MCT>>;

function isValidAmount(amount: AmountType) {
  if (amount instanceof Money) {
    amount = Money.toStringValue(amount);
  }
  return isDefined(amount) && !Number.isNaN(Number(amount));
}

/* function validateAmount<T extends AmountType>(amount: T) {
  if (!isValidAmount(amount)) {
    throw new Error(`Value ${amount} is not a valid number`);
  }
} */

export class Money<MCT extends CurrenciesType = undefined> {
  private amount: string;

  private currency: MCT;

  private readonly immutable: boolean;

  constructor(amount: AmountType, currency?: MCT, immutable?: boolean) {
    this.amount = Money.toStringValue(amount);
    this.currency = (arguments.length > 1 ? currency : amount instanceof Money ? amount.currency : undefined) as MCT;
    this.immutable = !!immutable;
  }

  public add<Amount extends AmountType, T extends CurrenciesType = undefined>(
    amount: Amount,
    currency?: T,
  ): MaybePromise<Amount, T, MCT> {
    if (!isValidAmount(this.amount) || !isValidAmount(amount)) {
      return this.cloneIfNeeded() as any;
    }
    if (currency !== undefined) {
      return new Money(amount, currency).convertTo(this.getCurrency()).then((r) => this.add(r)) as any;
    }
    return this.cloneIfNeeded((m) => (m.amount = BigDecimal.add(this.amount, Money.toStringValue(amount)))) as any;
  }

  public subtract<Amount extends AmountType, T extends CurrenciesType = undefined>(
    amount: Amount,
    currency?: T,
  ): MaybePromise<Amount, T, MCT> {
    if (!isValidAmount(this.amount) || !isValidAmount(amount)) {
      return this.cloneIfNeeded() as any;
    }
    if (currency) {
      return new Money(amount, currency).convertTo(this.getCurrency()).then((r) => this.subtract(r)) as any;
    }
    return this.cloneIfNeeded((m) => (m.amount = BigDecimal.subtract(this.amount, Money.toStringValue(amount)))) as any;
  }

  public multiply<Amount extends AmountType, T extends CurrenciesType = undefined>(
    amount: Amount,
    currency?: T,
  ): MaybePromise<Amount, T, MCT> {
    if (!isValidAmount(this.amount) || !isValidAmount(amount)) {
      return this.cloneIfNeeded() as any;
    }
    if (currency) {
      return new Money(amount, currency).convertTo(this.getCurrency()).then((r) => this.multiply(r)) as any;
    }
    return this.cloneIfNeeded((m) => (m.amount = BigDecimal.multiply(this.amount, Money.toStringValue(amount)))) as any;
  }

  public divide<Amount extends AmountType, T extends CurrenciesType = undefined>(
    amount: Amount,
    currency?: T,
    precision?: number,
  ): MaybePromise<Amount, T, MCT> {
    if (!isValidAmount(this.amount) || !isValidAmount(amount)) {
      return this.cloneIfNeeded() as any;
    }
    if (currency) {
      return new Money(amount, currency)
        .convertTo(this.getCurrency())
        .then((r) => this.divide(r, undefined, precision)) as any;
    }
    return this.cloneIfNeeded(
      (m) =>
        (m.amount = BigDecimal.divide(
          this.amount,
          Money.toStringValue(amount),
          precision === undefined ? 15 : precision,
        )),
    ) as any;
  }

  public round(precision?: number, mode: RoundingModes = 5): Money<MCT> {
    if (!isValidAmount(this.amount)) {
      return this.cloneIfNeeded() as any;
    }
    return this.cloneIfNeeded((m) => (m.amount = BigDecimal.round(this.amount, precision, mode)));
  }

  public floor(): Money<MCT> {
    if (!isValidAmount(this.amount)) {
      return this.cloneIfNeeded() as any;
    }
    return this.cloneIfNeeded((m) => (m.amount = BigDecimal.floor(m.amount)));
  }

  public value(moneyFormat?: boolean): string {
    if (!isValidAmount(this.amount)) {
      return this.amount;
    }

    if (!moneyFormat) {
      return BigDecimal.multiply(this.amount, 1);
    }
    const amount = this.amount.replace(/(\.\d*?)0+?$/, '$1'); // to remove trailing 0s
    if (Number(amount) === 0) {
      return '0.00';
    }
    const fractionalDigitCount = amount.split('.')[1]?.length;
    return Number(amount) < 0
      ? Number(amount).toFixed(2)
      : BigDecimal.round(amount, fractionalDigitCount || 2).toString();
  }

  public async convertTo<T extends CurrenciesType>(currency: T, rates: Record<string, number> = {}): Promise<Money<T>> {
    if (!isValidAmount(this.amount)) {
      return this.cloneIfNeeded() as any;
    }
    if (!currency) {
      throw new Error('No currency is set to convert to');
    }
    if (!this.getCurrency()) {
      throw new Error('No currency is set to convert from');
    }
    if (currency === (this.getCurrency() as any)) {
      return this.cloneIfNeeded() as any;
    }
    const pair = `${this.getCurrency()}/${currency}`;
    let rate = rates[pair];

    if (!rate) {
      rate = rates[reversePair(pair)];
      if (rate) {
        rate = 1 / rate;
      }
    }

    if (!rate) {
      rate = await clientService.request(InternalEventsEnum.RATE_SERVICE.RATE.GET, { pair });
    }

    const c = this.cloneIfNeeded();
    c.amount = BigDecimal.multiply(this.amount, rate);
    c.currency = currency as any;
    return c as any;
  }

  public getCurrency(): MCT {
    return this.currency;
  }

  public compareTo(amount: AmountType): 1 | 0 | -1 {
    return BigDecimal.compareTo(this.amount, Money.toStringValue(amount));
  }

  public equals(amount: AmountType): boolean {
    return this.compareTo(amount) === 0;
  }

  public isGreaterThan(amount: AmountType): boolean {
    return this.compareTo(amount) > 0;
  }

  public isGreaterThanOrEqual(amount: AmountType): boolean {
    return this.compareTo(amount) >= 0;
  }

  public isLessThan(amount: AmountType): boolean {
    return this.compareTo(amount) < 0;
  }

  public isLessThanOrEqual(amount: AmountType): boolean {
    return this.compareTo(amount) <= 0;
  }

  public static toStringValue(amount: AmountType): string {
    if (!isDefined(amount)) {
      return String(amount);
    }
    if (amount instanceof Money) {
      return amount.amount;
    }
    if (typeof amount === 'string') {
      return amount;
    }
    if (typeof amount === 'number' || typeof amount === 'bigint') {
      return String(amount);
    }
    throw new Error(`Invalid value ${amount}`);
  }

  public isImmutable(): boolean {
    return this.immutable;
  }

  public toImmutable(): Money<MCT> {
    if (this.isImmutable()) {
      return this.clone();
    }
    return this.clone({ immutable: true });
  }

  public toMutable(): Money<MCT> {
    if (!this.isImmutable()) {
      return this.clone();
    }
    return this.clone({ immutable: false });
  }

  private cloneIfNeeded(cb?: (money: Money<MCT>) => void): Money<MCT> {
    if (this.isImmutable()) {
      const c = this.clone();
      // eslint-disable-next-line no-unused-expressions
      cb && cb(c);
      return c as any;
    }
    // eslint-disable-next-line no-unused-expressions
    cb && cb(this);
    return this as any;
  }

  public clone<T extends CurrenciesType = MCT>(
    overrides?: Partial<{ amount: string; currency: T; immutable: boolean }>,
  ): Money<T> {
    return new Money<any>(
      overrides?.amount || this.amount,
      overrides?.currency || this.currency,
      overrides?.immutable || this.immutable,
    );
  }
}

export const money: <CT extends CurrenciesType = undefined>(
  amount: AmountType,
  currency?: CT,
  immutable?: boolean,
) => Money<CT> = (...args) => {
  return new Money(...args);
};
