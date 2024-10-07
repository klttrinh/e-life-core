import { createUnitTestModule, destroyUnitTestModule, resetDB, listenDB } from './index';
import { RateSourceEnum } from '../interfaces';
import { MailClientTypeEnum } from '../integrations';
import { FiatEnum } from '../models';
import { SystemSetting, SystemSettingsEnum, SystemSettingValueTypeEnum } from '../modules';

beforeAll(async () => createUnitTestModule(), 30_000);

beforeAll(async () =>
  // TODO add type to all
  SystemSetting.bulkCreate([
    {
      key: SystemSettingsEnum.STORAGE_PATH,
      value: JSON.stringify({ path: 'tmp' }),
    },
    {
      key: SystemSettingsEnum.DEFAULT_CREDIT_ORDER_CURRENCY,
      value: FiatEnum.USD,
    },
    {
      key: SystemSettingsEnum.STORAGE_SIZE,
      value: JSON.stringify({ size: '10MB' }),
    },
    {
      key: SystemSettingsEnum.FIREBLOCKS_IP_WHITELIST,
      value: '*',
    },
    {
      key: SystemSettingsEnum.TRANSACTION_ACCESS_TOKEN_TTL,
      value: '10000',
    },
    {
      key: SystemSettingsEnum.TRANSACTION_SERVICE_AVAILABLE,
      value: 'true',
    },
    {
      key: SystemSettingsEnum.MAX_TRANSACTION_BATCH_SIZE,
      value: '50',
    },
    {
      key: SystemSettingsEnum.CRYPTO_APIS_INITIAL_DELAY,
      value: '5000',
    },
    {
      key: SystemSettingsEnum.CRYPTO_APIS_RETRY_DELAY,
      value: '1000',
    },
    {
      key: SystemSettingsEnum.RATE_PROVIDERS,
      value: JSON.stringify([RateSourceEnum.KRAKEN, RateSourceEnum.FIXER, RateSourceEnum.BINANCE]),
    },
    {
      key: SystemSettingsEnum.RATE_NOTIFICATIONS_RECIPIENTS,
      value: JSON.stringify([RateSourceEnum.KRAKEN, RateSourceEnum.FIXER, RateSourceEnum.BINANCE]),
    },
    {
      key: SystemSettingsEnum.RATE_SUSPECTION_DIFF,
      value: '80',
    },
    {
      key: 'NUMBER_OF_CONFIRMATIONS', //  this is an enum in transaction service , dont change it
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
    {
      key: SystemSettingsEnum.RATE_LOCK_LIMIT_IN_SEC, //  this is an enum in transaction service , dont change it
      value: '300',
    },
    {
      key: SystemSettingsEnum.ENFORCE_ADMIN_2FA, //  this is an enum in transaction service , dont change it
      value: 'false',
    },
    {
      key: SystemSettingsEnum.AWS_S3_BUCKET, //  this is an enum in transaction service , dont change it
      value: 'xcoins-kyc-service-dev',
    },
    {
      key: SystemSettingsEnum.GOOGLE_SECRET_NAME, //  this is an enum in transaction service , dont change it
      value: 'Admin-Payment-Gateway',
    },
    {
      key: SystemSettingsEnum.SEND_HOOK_REQUEST_TIMEOUT, //  this is an enum in transaction service , dont change it
      value: '10000',
    },
    {
      key: SystemSettingsEnum.FORGOT_PASSWORD_TOKEN_TTL, //  this is an enum in transaction service , dont change it
      value: '300000',
    },
    {
      key: SystemSettingsEnum.DEFAULT_EMAIL_CLIENT,
      value: MailClientTypeEnum.MAIL_TRAP,
    },
    {
      key: SystemSettingsEnum.DEFAULT_FROM_EMAIL,
      value: 'support@xcoins.com',
    },
    {
      key: SystemSettingsEnum.DEFAULT_FROM_NAME,
      value: 'Xcoins Payment Gateway',
    },
    {
      key: SystemSettingsEnum.WEBHOOK_DELAY_PATTERN,
      value: JSON.stringify([60000, 120000]),
    },
    {
      key: SystemSettingsEnum.ADMIN_GOOGLE_SECRET_NAME,
      value: 'Payment Gateway Admin Console',
    },
    {
      key: SystemSettingsEnum.MERCHANT_GOOGLE_SECRET_NAME,
      value: 'Payment Gateway Merchant Console',
    },
    {
      key: SystemSettingsEnum.ADMIN_DASHBOARD_URL,
      value: 'https://dev-adminpayment.xcoins.network',
    },
    {
      key: SystemSettingsEnum.MERCHANT_DASHBOARD_URL,
      value: 'https://dev-merchant.xcoins.network',
    },
    {
      key: SystemSettingsEnum.SYSTEM_ADMIN_EMAILS,
      value: '[]',
    },
    {
      key: SystemSettingsEnum.ADMIN_NOTIFICATION_TYPES,
      value: JSON.stringify(['email']),
    },
    {
      key: SystemSettingsEnum.MAINTENANCE_MODE_ENABLED,
      value: 'false',
    },
    {
      key: SystemSettingsEnum.TIME_TO_ARCHIVE_INACTIVE_TRANSACTION,
      value: '2',
    },
    {
      key: SystemSettingsEnum.NO_MATCH_EMAIL_ENABLED,
      value: 'true',
    },
    {
      key: SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_NO_MATCH,
      value: '<html></html>',
    },
    {
      key: SystemSettingsEnum.NO_MATCH_EMAIL_RECIPIENTS,
      value: JSON.stringify(['test@xcoins.com']),
    },
    {
      key: SystemSettingsEnum.CREDIT_ORDER_ENABLED,
      value: 'false',
    },
    {
      key: SystemSettingsEnum.COINS_THRESHOLD,
      value: JSON.stringify({
        BTC: 2,
        LTC: 280,
        BCH: 200,
        ETH: 25,
        MATIC: 12000,
        USDT: 30000,
        DOGE: 150000,
        USDC: 30000,
      }),
    },
    {
      key: SystemSettingsEnum.IP_BLACK_LISTED_COUNTRIES_ISO_2,
      value: '[]',
      type: SystemSettingValueTypeEnum.StringArray,
    },
    {
      key: SystemSettingsEnum.REJECTED_EMAIL_ENABLED,
      value: 'false',
      type: SystemSettingValueTypeEnum.Boolean,
    },
    {
      key: SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_REJECTED,
      value: '<html></html>',
      type: SystemSettingValueTypeEnum.HTML,
    },
    {
      key: SystemSettingsEnum.REJECTED_EMAIL_RECIPIENTS,
      type: SystemSettingValueTypeEnum.StringArray,
      value: JSON.stringify(['test@xcoins.com']),
    },
    {
      key: SystemSettingsEnum.REFUND_NUMBER_OF_RETRIES,
      type: SystemSettingValueTypeEnum.Integer,
      value: '1',
    },
    {
      key: SystemSettingsEnum.SEON_SCORE_PLATINUM,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.SEON_SCORE_GOLD,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.SEON_SCORE_SILVER,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.SEON_BLACK_BOX_SCORE_PLATINUM,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.SEON_BLACK_BOX_SCORE_GOLD,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.SEON_BLACK_BOX_SCORE_SILVER,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.MAX_DURATION_TRANSACTION_HISTORY_INTERNAL,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.MAX_DURATION_TRANSACTION_HISTORY_EXTERNAL,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.MAX_DIFFERENT_CARD_HASHES_US,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
    {
      key: SystemSettingsEnum.MAX_DIFFERENT_CARD_HASHES_EU,
      type: SystemSettingValueTypeEnum.Integer,
      value: '0',
    },
  ]),
);

beforeEach(() => {
  jest.setTimeout(120000);
});

beforeAll(async () => listenDB());

afterEach(async () => resetDB());

afterAll(async () => SystemSetting.destroy({ where: {}, force: true, truncate: true }));

afterAll(async () => destroyUnitTestModule());
