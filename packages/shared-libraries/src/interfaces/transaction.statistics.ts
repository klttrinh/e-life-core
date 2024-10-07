export interface IGetTransactionStatisticsResponse {
  numberOfNoMatchTransactions: number | string;
  numberOfRejectedDepositTransactions: number | string;
  numberOfFailedTransactions: number | string;
  numberOfAlertedTransactions: number | string;
  numberOfFailedRefunds: number | string;
  numberOfFailedCreditOrders: number | string;
}
