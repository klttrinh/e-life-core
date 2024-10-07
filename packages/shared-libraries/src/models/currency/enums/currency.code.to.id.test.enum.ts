import { AllCurrenciesEnum } from './all.currency.enum';
import { isDefined } from '../../../utils';

const CurrencyCodeToIdMapper = new Map<AllCurrenciesEnum, number>([
  [AllCurrenciesEnum.USD, 10],
  [AllCurrenciesEnum.EUR, 11],
  [AllCurrenciesEnum.GBP, 12],
  [AllCurrenciesEnum.BTC, 13],
  [AllCurrenciesEnum.ETH, 14],
  [AllCurrenciesEnum.MATIC, 15],
  [AllCurrenciesEnum.DOGE, 16],
  [AllCurrenciesEnum.XRP, 17],
  [AllCurrenciesEnum.DOT, 18],
  [AllCurrenciesEnum.SOL, 19],
  [AllCurrenciesEnum.DAI, 20],
  [AllCurrenciesEnum.USDT, 21],
  [AllCurrenciesEnum.USDC, 22],
  [AllCurrenciesEnum.LTC, 23],
  [AllCurrenciesEnum.BCH, 24],
  [AllCurrenciesEnum.CAD, 25],
  [AllCurrenciesEnum.BRL, 26],
  [AllCurrenciesEnum.NZD, 27],
  [AllCurrenciesEnum.NOK, 28],
  [AllCurrenciesEnum.PEN, 29],
  [AllCurrenciesEnum.USDT, 30],
  [AllCurrenciesEnum.TRX, 31],
  [AllCurrenciesEnum.KRW, 32],
  [AllCurrenciesEnum.AZN, 33],
  [AllCurrenciesEnum.JPY, 34],
  [AllCurrenciesEnum.CLP, 35],
  [AllCurrenciesEnum.BDT, 36],
  [AllCurrenciesEnum.THB, 37],
  [AllCurrenciesEnum.BTC, 38],
  [AllCurrenciesEnum.ETH, 39],
  [AllCurrenciesEnum.USDT, 40],
  [AllCurrenciesEnum.BNB, 41],
  [AllCurrenciesEnum.BUSD, 42],
  [AllCurrenciesEnum.TUSD, 43],
  [AllCurrenciesEnum.MYR, 45],
  [AllCurrenciesEnum.IDR, 46],
  [AllCurrenciesEnum.VND, 47],
  [AllCurrenciesEnum.PHP, 48],
  [AllCurrenciesEnum.INR, 49],
  [AllCurrenciesEnum.PLN, 50],
  [AllCurrenciesEnum.SEK, 51],
  [AllCurrenciesEnum.CHF, 52],
  [AllCurrenciesEnum.AUD, 53],
  [AllCurrenciesEnum.TRY, 54],
  [AllCurrenciesEnum.AED, 55],
  [AllCurrenciesEnum.DKK, 56],
  [AllCurrenciesEnum.FTN, 57],
  [AllCurrenciesEnum.ZAR, 58],
  [AllCurrenciesEnum.COP, 59],
  [AllCurrenciesEnum.CRC, 60],
  [AllCurrenciesEnum.DOP, 61],
  [AllCurrenciesEnum.ISK, 62],
  [AllCurrenciesEnum.ILS, 63],
  [AllCurrenciesEnum.SGD, 64],
  [AllCurrenciesEnum.UAH, 65],
  [AllCurrenciesEnum.TWD, 66],
  [AllCurrenciesEnum.ADA, 67],
  [AllCurrenciesEnum.SHIB, 68],
]);
export function getCurrencyIdByCode(currencyCode: AllCurrenciesEnum): number {
  const currencyId = CurrencyCodeToIdMapper.get(currencyCode);
  if (isDefined(currencyId)) {
    return currencyId;
  }
  const msg = `Error: getCurrencyIdByCode(${currencyCode}): currencyId not found `;
  console.error(msg);
  throw new Error(msg);
}
