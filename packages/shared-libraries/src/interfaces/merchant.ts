import { ExternalBookingCurrencyEnum } from '../models/merchant/enums/external.booking.currency.enum';
import { MerchantStatusEnum } from '../models/merchant/enums/merchant-status.enum';
import { FiatEnum } from '../models/currency';
import { TransactionTypeEnum } from '../models/transaction/enums/transaction.type.enum';
import { BookingCurrencyEnum } from '../models';

interface IMerchantCurrencies {
  bookingCurrencyCode: BookingCurrencyEnum;
  bookingCurrencyId: number;
  settlementCurrencyId: number;
  settlementCurrencyCode: string;
  settlementSpread: number;
  depositMinimumAmount: number;
  depositDefaultAmount: number;
  depositMaximumAmount: number;
  withdrawalMinimumAmount: number;
  withdrawalMaximumAmount: number;
  fiatCurrencyCode: FiatEnum;
  fiatCurrencyId: number;
}
export interface IMerchant {
  id: number;
  externalId: string;
  apiKey: string;
  privateKey: string; // private key to create signature for webhook
  publicKey: string;
  webhookUrl: string;
  redirectUrl: string;
  walletAddress?: string;
  webhookNotificationEnabled: boolean;
  transactionAmountUpdateEnabled: boolean;
  onOffRampEnabled: boolean;
  withdrawalBalanceLimit: number;
  name: string;
  status: MerchantStatusEnum;
  defaultCryptoCurrency: number;
  maximumUnverifiedSwapAmount: number;
  defaultAmount: number; // 0
  depositProcessingFee: number; // percentage
  merchantDepositFee: number; // balance deposit fee in percentage
  onOffRampDepositFee: number; // percentage
  withdrawalProcessingFee: number;
  refundProcessingFee: number;
  minimumAmount: number; // 0
  maximumAmount: number; // 1000
  userCount: number;
  ipWhiteList: string; // list of ips, separated by ","  -   "*" is the wildcard
  registrationDate: Date;
  deletedAt: Date;
  webhookJobIds: string[];
  availableOnrCryptoCurrencies: number[];
  pgSettlementDueDate: number;
  onrSettlementDueDate: number;
  phoneNumber: string;
  twoFactorEnabled: boolean;
  merchantSettlementCurrencyUsd: FiatEnum;
  merchantSettlementCurrencyEur: FiatEnum;
  merchantSettlementCurrencyGbp: FiatEnum;
  externalBookingCurrencyUsd: ExternalBookingCurrencyEnum;
  externalBookingCurrencyEur: ExternalBookingCurrencyEnum;
  externalBookingCurrencyGbp: ExternalBookingCurrencyEnum;
  settlementSpreadEur: number;
  settlementSpreadGbp: number;
  settlementSpreadUsd: number;
  availableCryptoCurrencies?: number[];
  notifyWithdrawalExceededRoles: number[];
  checkWalletOwnership: boolean;
  depositWalletDeclarationRequired: boolean;
  rateSpreads: { [P: string]: { [K in TransactionTypeEnum]: number } };
  merchantCurrencies: IMerchantCurrencies[];
  bmRecipients: string[];
}
