import { Money } from './money.util';

describe('Money Utility', () => {
  let money: Money<any>;

  beforeEach(() => {
    money = new Money(100);
  });

  it('should check add functionality', () => {
    money.add(100);
    expect(+money.value()).toEqual(200);
  });

  it('should check subtract functionality', () => {
    money.subtract(10);
    expect(+money.value()).toEqual(90);
  });

  it('should check multiply functionality', () => {
    money.multiply(10);
    expect(+money.value()).toEqual(1000);
  });

  it('should check divide functionality', () => {
    money.divide(10);
    expect(+money.value()).toEqual(10);
  });

  it('should check round functionality', () => {
    money = new Money(100.222);

    money.round(1);
    expect(+money.value()).toEqual(100.2);
  });

  it('should round correctly', () => {
    money = new Money('0.00000019472630781482203635');
    const scale = 8;

    money.round(scale);
    expect(money.value()).toEqual('0.00000019');
  });

  it('should check floor functionality', () => {
    money = new Money(100.222);

    money.floor();
    expect(+money.value()).toEqual(100);
  });
  describe('Money value money format', () => {
    it('should get rid of 0s at the end when moneyFormat is true', () => {
      money = new Money('100.22200000');

      money.round(5);
      expect(money.value(true)).toEqual('100.222');
    });

    it('should get rid of  extra 0s at the end even with precision when moneyFormat is true', () => {
      money = new Money('100.22200000');

      money.round(9);
      expect(money.value(true)).toEqual('100.222');
    });

    it('should return 0,00 for repetitive 0s ', () => {
      money = new Money('0.00000000');

      money.round(5);
      expect(money.value(true)).toEqual('0.00');
    });
  });

  it('should check compare functionality', () => {
    let value: any;

    value = money.compareTo(99);
    expect(value).toEqual(1);

    value = money.compareTo(100);
    expect(value).toEqual(0);

    value = money.compareTo(101);
    expect(value).toEqual(-1);

    value = money.isGreaterThan(200);
    expect(value).toEqual(false);

    value = money.equals(100);
    expect(value).toEqual(true);

    value = money.isGreaterThanOrEqual(100);
    expect(value).toEqual(true);

    value = money.isLessThan(99);
    expect(value).toEqual(false);

    value = money.isLessThanOrEqual(100);
    expect(value).toEqual(true);
  });

  /*
   * money toImmutable retuen a copy of the money and set immutable to true
   * money toMutable retuen a copy of the money and set immutable to false
   */
  it('should check Immutable functionality', () => {
    const immutableMoney = money.toImmutable();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(immutableMoney.immutable).toEqual(true);

    const mutableMoney = money.toMutable();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(mutableMoney.immutable).toEqual(false);
  });
});
