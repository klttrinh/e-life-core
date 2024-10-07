export interface BalanceWithdrawalRequestInfo {
  estimatedNetworkFee: number | null;
  currency: Record<string, any>;
  currencyBalance: number;
  cumulativeAmount: number;
  canWithdraw: boolean;
  currencyBalanceAfterWithdrawal: number;
  processingFeeAmount: number;
  additionalRequiredAmount: number;
  maxWithdrawableAmount: number;
}
