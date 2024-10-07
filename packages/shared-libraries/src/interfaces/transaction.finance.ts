import { CurrencyDto } from '../models/currency/dto/currency.dto';

export interface Volume {
  [key: string]:
    | {
        value: string | number;
        percentage: string | number;
      }
    | string
    | number;
  totalEur: number | string;
  processingFee: number | string;
  settlementSpread: number | string;
  revenue: number | string;
  numberOfTransactions: number | string;
}

export interface Balance {
  [key: string]:
    | {
        value: string | number;
        percentage: string | number;
        currencySymbol: string;
      }
    | string;
}

export interface BatchedBalanceDetail extends Balance {
  totalEur: string;
}

export interface IGetTransactionFinanceResponse {
  numberOfTransactions: number | string;
  numberOfMerchantUsers?: number | string;
  numberOfMerchants?: number | string;
  averageRevenuePerTransactions: number | string;
  totalRevenue: number | string;
  totalProcessingFees: number | string;
  totalSettlementSpread: number | string;
  totalExternalFee: number | string;
  depositVolume: Volume;
  withdrawalVolume: Volume;
  refundVolume: Volume;
  averageRevenuePerUser?: number | string;
  averageRevenuePerMerchant?: number | string;
  totalBalanceDetails?: BatchedBalanceDetail;
  batchedBalanceDetails?: BatchedBalanceDetail;
  availableBalanceDetails?: BatchedBalanceDetail;
  currency?: Partial<CurrencyDto>;
}

export interface IMerchantTransactionFinanceResponse {
  id: number | string;
  name: string;
  batchedBalanceDetails?: BatchedBalanceDetail;
  totalBalanceDetails?: BatchedBalanceDetail;
  availableBalanceDetails?: BatchedBalanceDetail;
  numberOfTransactions: number | string;
  depositVolume: BatchedBalanceDetail;
  withdrawalVolume: BatchedBalanceDetail;
  refundVolume: BatchedBalanceDetail;
  currency?: Partial<CurrencyDto>;
}
