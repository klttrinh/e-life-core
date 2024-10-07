import { FiatEnum } from './fiat.enum';
import { CryptoEnum } from './crypto.enum';

export const AllCurrenciesEnum = { ...FiatEnum, ...CryptoEnum };
export type AllCurrenciesEnum = (typeof CryptoEnum)[keyof typeof CryptoEnum] | (typeof FiatEnum)[keyof typeof FiatEnum];
