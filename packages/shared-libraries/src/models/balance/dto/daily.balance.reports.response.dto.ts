export interface DailyBalanceReportsResponseDto {
  id: number;
  merchant_id: number;
  date: Date;
  settlement_currency_code: string;
  settlement_currency_id: number;
  deposits: string;
  withdrawals: string;
  processing_fees: string;
  adhoc: string;
  miscellaneous: string;
  network_fees: string;
  payout_fees: string;
  payouts: string;
  daily_balance_change: string;
  total_balance: string;
}
