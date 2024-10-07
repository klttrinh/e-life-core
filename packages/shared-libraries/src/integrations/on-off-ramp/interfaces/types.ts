import { StatusReasonEnum } from '../../../models/transaction/enums/status-reason.enum';
import { OnOffRampDestinationTypesEnum } from '../enums/on-off-ramp-destination-types.enum';
import { OnOffRampSourceTypesEnum } from '../enums/on-off-ramp-source-types.enum';
import { OnOffRampStatusesEnum } from '../enums/on-off-ramp-statuses.enum';
import { OnOffRampIncomingEventTypesEnum } from '../enums/on-off-ramp-types.enum';

export class OnOffRampTransactionResponse {
  id: string; // id of transaction form on off ramp

  type: OnOffRampIncomingEventTypesEnum;

  sourceType: OnOffRampSourceTypesEnum;

  sourceId: string;

  transactionHash?: string;

  walletAddress?: string;

  displayId: string;

  internalConversionRate: string; // number

  internalAmount: string; // number

  internalFee: string; // number

  webhookCalled: boolean;

  destinationType: OnOffRampDestinationTypesEnum;

  destinationId: string;

  currencyCode: string; // from currency (fiat currency)

  amount: string;

  fee: string;

  status: OnOffRampStatusesEnum;

  externalRef?: string; // id of transaction in transaction service

  providerReason?: string;

  externalData?: any;

  declinedReasons?: object;

  statusReason?: StatusReasonEnum;

  expiresAt?: string; // Date string

  createdAt: string; // Date string

  deletedAt: string; // Date string

  updatedAt: string; // Date string
}
