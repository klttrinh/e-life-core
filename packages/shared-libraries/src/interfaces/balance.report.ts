export interface IBalanceReport {
  id: number;
  merchantId: number;
  merchantName?: string;
  settlementCurrencyCode: string;
  date: Date;
  deposits: number;
  withdrawals: number;
  processingFees: number;
  adhoc: number;
  miscellaneous: number;
  networkFees: number;
  payouts: number;
  dailyBalanceChange: number;
  totalBalance: number;
  payoutFees: number;
}
