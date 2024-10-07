export interface IGetTransactionMerchantsStatistics {
  deposit: {
    [key: string]:
      | {
          value: string | number;
          percentage: string | number;
        }
      | string;
  } & { numberOfTransactions: number };
  withdrawal: {
    [key: string]:
      | {
          value: string | number;
          percentage: string | number;
        }
      | string;
  } & { numberOfTransactions: number };
  refund: {
    [key: string]:
      | {
          value: string | number;
          percentage: string | number;
        }
      | string;
  } & { numberOfTransactions: number };
}
