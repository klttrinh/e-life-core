import {
  AmlScreeningResult,
  AmountInfo,
  BlockInfo,
  FeeInfo,
  TransactionOperation,
  TransferPeerPathResponse,
} from 'fireblocks-sdk';
import { FireblocksTransactionStatusEnum } from '../src/types';

export class TransactionDetailDto {
  id: string;

  assetId: string;

  source: TransferPeerPathResponse;

  destination: TransferPeerPathResponse;

  requestedAmount: number;

  amountInfo: AmountInfo;

  feeInfo: FeeInfo;

  amount: number;

  netAmount: number;

  amountUSD: number;

  serviceFee: number;

  treatAsGrossAmount: boolean;

  networkFee: number;

  createdAt: number;

  lastUpdated: number;

  status: FireblocksTransactionStatusEnum;

  txHash: string;

  index: number;

  subStatus: Record<string, unknown>;

  sourceAddress: string;

  destinationAddress: string;

  destinationAddressDescription: string;

  destinationTag: string;

  signedBy: string[];

  createdBy: string;

  rejectedBy: string;

  addressType: string;

  note: string;

  exchangeTxId: string;

  feeCurrency: string;

  operation: TransactionOperation;

  amlScreeningResult: AmlScreeningResult;

  customerRefId: string;

  numOfConfirmation: number;

  networkRecords: Record<string, unknown>[];

  replacedTxHash: string;

  externalTxId: string;

  destinations: Record<string, unknown>[];

  blockInfo: BlockInfo;

  authorizationInfo: Record<string, unknown>;

  signedMessages: Record<string, unknown>[];

  /**
   * JSON object
   */
  extraParameters: string;
}
