import { FiatEnum, StatementTypeEnum } from '../models';

export interface ITransactionBatch {
  id: number;

  batchNumber: string;

  description: string;

  batchDate: Date | string;

  completionDate?: Date | string;

  merchantSettlementCurrency: FiatEnum;

  settlementDueDate?: Date | string;

  type: StatementTypeEnum;

  merchantId: string;

  totalNetSettlementAmount: string;

  totalSettlementAmount: string;

  totalProcessingFeeAmount: string;

  toCurrencyId: string;

  externalFee: string;

  payoutFee: string;

  createdAt: Date;

  updatedAt: Date;
}
