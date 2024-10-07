import { FiatEnum } from '../models';

export interface IGetTransactionVolumeResponse {
  totalCurrencyCode: FiatEnum | string;
  total: string;
  details: any[];
}

export interface IGetTransactionVolumeMerchantResponse {
  details: {
    [key: string]: object;
  };
}
