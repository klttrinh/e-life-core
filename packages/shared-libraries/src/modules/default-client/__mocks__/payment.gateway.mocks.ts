import { faker } from '@faker-js/faker';
import {
  CryptoEnum,
  AssetStatusEnum,
  MerchantStatusEnum,
  FiatEnum,
  ExternalBookingCurrencyEnum,
  MerchantUserStatusEnum,
  BookingCurrencyEnum,
} from '../../../models';
import { IMerchant } from '../../../interfaces';
import { SystemSettingsEnum } from '../../system-setting/enums/system.settings.enum';

async function paymentGatewayApiAssetsFetchDisabled(data?: any): Promise<any> {
  return [
    {
      id: faker.number.bigInt(),
      currency_id: faker.number.bigInt(),
      currency_code: CryptoEnum.BTC,
      status: AssetStatusEnum.DISABLED,
      one_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      five_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      one_day_limit: faker.number.float({ multipleOf: 0.001 }),
    },
    {
      id: faker.number.bigInt(),
      currency_id: faker.number.bigInt(),
      currency_code: CryptoEnum.ETH,
      status: AssetStatusEnum.DISABLED,
      one_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      five_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      one_day_limit: faker.number.float({ multipleOf: 0.001 }),
    },
  ];
}

async function paymentGatewayApiAssetsGetAll(): Promise<any> {
  return [];
}

async function paymentGatewayApiAssetsUpdateStatus(data?: any): Promise<any> {
  return [
    {
      id: faker.number.bigInt(),
      status: data.status,
    },
    {
      id: faker.number.bigInt(),
      status: data.status,
    },
  ];
}

async function paymentGatewayApiAssetsIsActive(data?: any): Promise<any> {
  return [
    {
      id: faker.number.bigInt(),
      currency_id: faker.number.bigInt(),
      currency_code: CryptoEnum.ETH,
      status: AssetStatusEnum.ENABLED,
      one_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      five_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      one_day_limit: faker.number.float({ multipleOf: 0.001 }),
    },
    {
      id: faker.number.bigInt(),
      currency_id: faker.number.bigInt(),
      currency_code: CryptoEnum.USDT,
      status: AssetStatusEnum.ENABLED,
      one_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      five_minute_limit: faker.number.float({ multipleOf: 0.001 }),
      one_day_limit: faker.number.float({ multipleOf: 0.001 }),
    },
  ];
}

async function paymentGatewayApiGetAllSystemSettings(data?: any): Promise<any> {
  return [
    {
      id: faker.number.bigInt(),
      external_id: faker.number.bigInt(),
      value: faker.number.bigInt(),
    },
    {
      id: faker.number.bigInt(),
      key: faker.word.noun(),
      value: faker.number.bigInt(),
    },
    {
      id: faker.number.bigInt(),
      key: SystemSettingsEnum.RATE_LOCK_LIMIT_IN_SEC,
      value: '300',
    },
    {
      id: faker.number.bigInt(),
      key: 'NUMBER_OF_CONFIRMATIONS',
      value: JSON.stringify({
        ethereum: {
          MATIC: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          DOT: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          DAI: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          ETH: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          USDC: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          USDT: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          XRP: { LOW: 1, MEDIUM: 1, HIGH: 1 },
          SOL: { LOW: 1, MEDIUM: 1, HIGH: 1 },
        },
        bitcoin: { USDT: { LOW: 1, MEDIUM: 0, HIGH: 0 }, BTC: { LOW: 1, MEDIUM: 0, HIGH: 0 } },
        litecoin: { LTC: { LOW: 1, MEDIUM: 0, HIGH: 0 } },
        'bitcoin-cash': { BCH: { LOW: 1, MEDIUM: 0, HIGH: 0 } },
        dogecoin: { DOGE: { LOW: 1, MEDIUM: 0, HIGH: 0 } },
      }),
    },
  ];
}

async function paymentGatewayApiGetMerchant(data?: any): Promise<IMerchant & { merchantCurrencies: any[] }> {
  return {
    id: faker.number.int({ max: 100 }),
    name: faker.string.sample(10),
    externalId: faker.string.uuid(),
    apiKey: faker.string.uuid(),
    publicKey: '',
    privateKey: '',
    status: MerchantStatusEnum.ACTIVE,
    webhookUrl: faker.internet.domainName(),
    redirectUrl: faker.internet.domainName(),
    phoneNumber: faker.phone.number(),
    webhookNotificationEnabled: faker.datatype.boolean(),
    transactionAmountUpdateEnabled: faker.datatype.boolean(),
    ipWhiteList: '*',
    defaultCryptoCurrency: 13,
    maximumUnverifiedSwapAmount: 300,
    merchantSettlementCurrencyEur: FiatEnum.EUR,
    merchantSettlementCurrencyUsd: FiatEnum.EUR,
    merchantSettlementCurrencyGbp: FiatEnum.EUR,
    pgSettlementDueDate: 3,
    onrSettlementDueDate: 1,
    externalBookingCurrencyEur: ExternalBookingCurrencyEnum.EUR,
    externalBookingCurrencyUsd: ExternalBookingCurrencyEnum.EUR,
    externalBookingCurrencyGbp: ExternalBookingCurrencyEnum.EUR,
    withdrawalBalanceLimit: 100000,
    defaultAmount: 0,
    minimumAmount: 0,
    maximumAmount: 100000,
    onOffRampEnabled: true,
    onOffRampDepositFee: 0.01,
    depositProcessingFee: 0.033,
    merchantDepositFee: 0.02,
    withdrawalProcessingFee: 0.044,
    refundProcessingFee: 0.055,
    twoFactorEnabled: false,
    registrationDate: new Date(),
    webhookJobIds: [''],
    settlementSpreadGbp: 1,
    settlementSpreadUsd: 1,
    settlementSpreadEur: 1,
    availableCryptoCurrencies: [],
    availableOnrCryptoCurrencies: [],
    checkWalletOwnership: true,
    deletedAt: null,
    notifyWithdrawalExceededRoles: [],
    rateSpreads: {},
    userCount: 1,
    walletAddress: faker.string.sample(20),
    merchantCurrencies: [
      {
        settlementSpread: 0,
        fiatCurrencyCode: FiatEnum.EUR,
        fiatCurrencyId: 11,
        settlementCurrencyCode: 'BTC',
        bookingCurrencyCode: BookingCurrencyEnum.EUR,
        bookingCurrencyId: 11,
        settlementCurrencyId: 11,
        depositMinimumAmount: 1,
        depositMaximumAmount: 2000,
        withdrawalMinimumAmount: 1,
        withdrawalMaximumAmount: 2000,
        depositDefaultAmount: 200,
      },
    ],
    depositWalletDeclarationRequired: false,
    bmRecipients: [],
  };
}

async function paymentGatewayApiMerchantUsersGet(data?: any): Promise<any> {
  return [
    {
      id: data.id,
      external_id: faker.number.bigInt(),
      name: faker.word.noun(),
      date_of_birth: new Date(),
      status: MerchantUserStatusEnum.ACTIVE,
      country: faker.address.country(),
      user_level_id: faker.number.bigInt(),
    },
  ];
}

async function paymentGatewayApiSendWebhook(data?: any): Promise<any> {
  return [
    {
      success: faker.datatype.boolean(),
    },
  ];
}

export {
  paymentGatewayApiAssetsGetAll,
  paymentGatewayApiAssetsFetchDisabled,
  paymentGatewayApiAssetsIsActive,
  paymentGatewayApiAssetsUpdateStatus,
  paymentGatewayApiGetAllSystemSettings,
  paymentGatewayApiGetMerchant,
  paymentGatewayApiMerchantUsersGet,
  paymentGatewayApiSendWebhook,
};
