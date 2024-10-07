/* eslint-disable max-len */
import 'dotenv/config';
import { ServicesEnum } from '../../../general';

const ENDPOINTS: { [key in ServicesEnum]: string } = {
  [ServicesEnum.TRANSACTION_SERVICE]: process.env.TRANSACTION_SERVICE_URL,
  [ServicesEnum.RATE_SERVICE]: process.env.RATE_SERVICE_URL,
  [ServicesEnum.PAYMENT_GATEWAY_API]: process.env.PAYMENT_GATEWAY_URL,
  [ServicesEnum.KYC_SERVICE]: process.env.KYC_SERVICE_URL,
  [ServicesEnum.WHITELABEL_API]: process.env.WHITELABEL_URL,
  [ServicesEnum.MOBILE_API]: process.env.MOBILE_API_URL,
  [ServicesEnum.ON_OFF_RAMP]: process.env.ON_OFF_RAMP_URL,
  [ServicesEnum.TRAFFIC_PROTECTION_ENGINE]: process.env.TRAFFIC_PROTECTION_ENGINE_URL,
};

export const InternalEventsEnum = {
  [ServicesEnum.TRANSACTION_SERVICE]: {
    TRANSACTION: {
      CREATE_TRANSACTION_LOG: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/CREATE_TRANSACTION_LOG`,
      CREATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/CREATE`,
      CREATE_AD_HOC_REFUND: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/CREATE_AD_HOC_REFUND`,
      CREATE_REFUND: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/CREATE_REFUND`,
      CREATE_MISCELLANEOUS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/CREATE_MISCELLANEOUS`,
      UNFREEZE_TRANSACTION: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/UNFREEZE_TRANSACTION`,
      FREEZE_TRANSACTION: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/FREEZE_TRANSACTION`,
      REJECT: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/REJECT`,
      ACCEPT: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/ACCEPT`,
      BOOK: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/BOOK`,
      CLIENT_UPDATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/CLIENT_UPDATE`,
      ADMIN_UPDATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/ADMIN_UPDATE`,
      GET_ALL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_ALL`,
      GET: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET`,
      GENERATE_ACCESS_TOKEN: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GENERATE_ACCESS_TOKEN`,
      VALIDATE_ACCESS_TOKEN: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/VALIDATE_ACCESS_TOKEN`,
      COUNT: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/COUNT`,
      GET_VOLUME: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_VOLUME`,
      GET_STATISTICS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_STATISTICS`,
      GET_FINANCE_DETAILS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_FINANCE_DETAILS`,
      GET_MERCHANTS_FINANCE_DETAILS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_MERCHANTS_FINANCE_DETAILS`,
      GET_BY_FILTER: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_BY_FILTER`,
      GET_MERCHANTS_STATISTICS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_MERCHANTS_STATISTICS`,
      GET_MERCHANT_USERS_STATISTICS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_MERCHANT_USERS_STATISTICS`,
      SET_EXTERNAL_REF: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/SET_EXTERNAL_REF`,
      HALT_COIN: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/HALT_COIN`,
      RESET_MERCHANT_WITHDRAWAL_BALANCES: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/RESET_MERCHANT_WITHDRAWAL_BALANCES`,
      MERCHANT_BALANCE_LIMIT_UPDATED: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/MERCHANT_BALANCE_LIMIT_UPDATED`,
      ACCEPT_ALERTED_WITHDRAWAL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/ACCEPT_ALERTED_WITHDRAWAL`,
      REJECT_ALERTED_WITHDRAWAL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/REJECT_ALERTED_WITHDRAWAL`,
      ACCEPT_ALERTED_REFUND: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/ACCEPT_ALERTED_REFUND`,
      REJECT_ALERTED_REFUND: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/REJECT_ALERTED_REFUND`,
      RUN_ARCHIVE_TASK: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/RUN_ARCHIVE_TASK`,
      DELETE_MERCHANT_TRANSACTIONS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/DELETE_MERCHANT_TRANSACTIONS`,
      RESTORE_MERCHANT_TRANSACTIONS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/RESTORE_MERCHANT_TRANSACTIONS`,
      FIREBLOCKS_WEBHOOK_SIMULATOR: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/webhook-simulator/FIREBLOCKS`,
      RESET_TRANSACTION_DATA: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-simulator/reset`,
      GET_BALANCE_WITHDRAWAL_REQUEST_INFO: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_BALANCE_WITHDRAWAL_REQUEST_INFO`,
      FORCE_BATCH: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/FORCE_BATCH`,
      GET_CURRENCY_BALANCE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transactions/GET_CURRENCY_BALANCE`,
    },
    FIREBLOCKS: {
      FEE_ESTIMATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/fireblocks/FEE_ESTIMATE`,
      ASSET_BALANCE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/fireblocks/ASSET_BALANCE`,
    },
    BALANCE: {
      QUERY_REPORTS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/balance/QUERY_REPORTS`,
    },
    EXTERNAL_CRYPTO_WALLET: {
      TEST: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/TEST`,
      CHAIN_ANALYSIS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/CHAIN_ANALYSIS`,
      CREATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/CREATE`,
      SAFE_CREATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/SAFE_CREATE`,
      GET: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/GET`,
      ONRAMP_WALLET_AML_CHECK: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/ONRAMP-WALLET-AML-CHECK`,
      ONRAMP_WALLET_VALIDATION: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/external-crypto-wallet/ONRAMP_WALLET_VALIDATION`,
    },
    TRANSACTION_BATCH: {
      CREATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/CREATE`,
      GET: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/GET`,
      GET_ALL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/GET_ALL`,
      UPDATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/UPDATE`,
      UPDATE_SETTLEMENT_DUE_DATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/UPDATE_SETTLEMENT_DUE_DATE`,
      DELETE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/DELETE`,
      RUN_BATCH_TASK: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/RUN_BATCH_TASK`,
      PAYOUT: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/transaction-batch/PAYOUT`,
    },
    STATISTICS: {
      CREATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/CREATE`,
      GET: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/GET`,
      GET_ALL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/GET_ALL`,
      UPDATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/UPDATE`,
      REBUILD_STATISTICS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/REBUILD_STATISTICS`,
      DELETE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/DELETE`,
      GET_STATISTICS_ADMIN_MONTHLY_VOLUME: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/GET_STATISTICS_ADMIN_MONTHLY_VOLUME`,
      GET_STATISTICS_MERCHANT_MONTHLY_VOLUME: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/GET_STATISTICS_MERCHANT_MONTHLY_VOLUME`,
      GET_STATISTICS_MERCHANT_MONTHLY_COUNT: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/GET_STATISTICS_MERCHANT_MONTHLY_COUNT`,
      GET_STATISTICS_MERCHANT_TRANSACTION_VOLUME: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/statistics/GET_STATISTICS_MERCHANT_TRANSACTION_VOLUME`,
    },
    DEPOSIT_WALLET: {
      GENERATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/deposit-wallet/GENERATE`,
      GENERATE_BALANCE_WALLET: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/deposit-wallet/GENERATE_BALANCE_WALLET`,
    },
    CURRENCY: {
      CREATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/currencies/CREATE`,
      GET_ONE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/currencies/GET_ONE`,
      GET_ALL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/currencies/GET_ALL`,
      UPDATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/currencies/UPDATE`,
      DELETE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/currencies/DELETE`,
    },
    SYSTEM_SETTINGS: {
      GET: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/system-settings/GET`,
      GET_ALL: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/system-settings/GET_ALL`,
      REFRESH: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/system-settings/REFRESH`,
      QUERY: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/system-settings/QUERY`,
      UPDATE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/system-settings/UPDATE`,
      QUERY_LOGS: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/system-settings/QUERY_LOGS`,
    },
    VAULT: {
      REFRESH_BALANCE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/vault/REFRESH_BALANCE`,
      SWEEP_ALGORITHM: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/vault/SWEEP_ALGORITHM`,
      GET_ALL_ASSETS_BALANCES: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/vault/GET_ALL_ASSETS_BALANCES`,
    },
    AUDIT_LOGS: {
      QUERY: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/audit-logs/QUERY`,
    },
    DATABASE_AUDITS: {
      GET_EXPORTABLE: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/database-audits/GET_EXPORTABLE`,
      RUN_CLEAR_TASK: `${ENDPOINTS.TRANSACTION_SERVICE}/${process.env.VERSION}/internal/database-audits/RUN_CLEAR_TASK`,
    },
  },
  [ServicesEnum.RATE_SERVICE]: {
    RATE: {
      GET: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/GET`,
      GET_DETAILED: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/GET_DETAILED`,
      GET_MULTI: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/GET_MULTI`,
      GET_WITH_OHLC: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/GET_WITH_OHLC`,
      COIN_INFO: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/COIN_INFO`,
      PROVIDERS: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/PROVIDERS`,
      LOG_OUTDATED_PAIRS: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/LOG_OUTDATED_PAIRS`,
      CHECK_OHLC_24_HOURS: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/CHECK_OHLC_24_HOURS`,
      CHECK_OHLC_1_MIN: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/CHECK_OHLC_1_MIN`,
      CHECK_OHLC_5_MIN: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/CHECK_OHLC_5_MIN`,
      UPDATE_FIXER_RATES: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/UPDATE_FIXER_RATES`,
      UPDATE_FASTEX_RATES: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/UPDATE_FASTEX_RATES`,
      UPDATE_EXCHANGE_RATE_API_RATES: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/UPDATE_EXCHANGE_RATE_API_RATES`,
      COMPARE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/COMPARE`,
      EXPORT_PROVIDERS: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/EXPORT_PROVIDERS`,
      RUN_RATE_COMPARISON_TASK: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/rates/RUN_RATE_COMPARISON_TASK`,
    },
    SYSTEM_SETTINGS: {
      GET: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/system-settings/GET`,
      GET_ALL: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/system-settings/GET_ALL`,
      REFRESH: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/system-settings/REFRESH`,
      QUERY: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/system-settings/QUERY`,
      UPDATE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/system-settings/UPDATE`,
      QUERY_LOGS: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/system-settings/QUERY_LOGS`,
    },
    PAIRS: {
      GET: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pairs/GET`,
      UPDATE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pairs/UPDATE`,
      DELETE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pairs/DELETE`,
      PAGINATE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pairs/PAGINATE`,
      UPDATE_OHLC: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pairs/UPDATE_OHLC`,
      SAVE_INTERVALS: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pairs/SAVE_INTERVALS`,
    },
    PAIR_RULES: {
      CREATE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pair-rules/CREATE`,
      UPDATE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pair-rules/UPDATE`,
      DELETE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pair-rules/DELETE`,
      PAGINATE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/pair-rules/PAGINATE`,
    },
    DATABASE_AUDITS: {
      GET_EXPORTABLE: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/database-audits/GET_EXPORTABLE`,
      RUN_CLEAR_TASK: `${ENDPOINTS.RATE_SERVICE}/${process.env.VERSION}/internal/database-audits/RUN_CLEAR_TASK`,
    },
  },
  [ServicesEnum.PAYMENT_GATEWAY_API]: {
    ASSETS: {
      IS_ACTIVE: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/assets/IS_ACTIVE`,
      UPDATE_STATUS: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/assets/UPDATE_STATUS`,
      FETCH_DISABLED: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/assets/FETCH_DISABLED`,
      GET_ALL: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/assets/GET_ALL`,
    },
    SYSTEM_SETTINGS: {
      GET_ALL: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/system-settings/GET_ALL`,
      CLEAR_CACHE: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/system-settings/CLEAR_CACHE`,
    },
    MERCHANTS: {
      GET: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchants/GET`,
      UPDATE_MERCHANTS_BALANCES: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchants/UPDATE_MERCHANTS_BALANCES`,
      GET_IDS: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchants/GET_IDS`,
      COUNT: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchants/COUNT`,
      GET_MERCHANT_CURRENCIES: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchants/GET_MERCHANT_CURRENCIES`,
    },
    MERCHANT_USERS: {
      GET: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchant-users/GET`,
      GET_MERCHANT: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchant-users/GET_MERCHANT`,
      UNFREEZE: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchant-users/UNFREEZE`,
      FREEZE: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchant-users/FREEZE`,
      COUNT: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchant-users/COUNT`,
      KYC_DEPOSIT_LIMIT_PASSED: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/merchant-users/KYC_DEPOSIT_LIMIT_PASSED`,
    },
    TRANSACTION: {
      SEND_WEBHOOK: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/transactions/SEND_WEBHOOK`,
      GET_PARTICIPANTS_INFORMATION: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/transactions/GET_PARTICIPANTS_INFORMATION`,
    },
    MERCHANT_BALANCES: {
      UPDATE_BALANCES: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/balance/merchant-balances/UPDATE_BALANCES`,
    },
    NOTIFICATIONS: {
      CREATE: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/notifications/CREATE`,
      NOTIFY_ERROR: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/notifications/NOTIFY_ERROR`,
    },
    SETTLEMENT_CURRENCIES: {
      GET_ALL: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/settlement-currencies/GET_ALL`,
    },
    DATABASE_AUDITS: {
      RUN_CLEAR_TASK: `${ENDPOINTS.PAYMENT_GATEWAY_API}/${process.env.VERSION}/internal/database-audits/RUN_CLEAR_TASK`,
    },
  },
  [ServicesEnum.TRAFFIC_PROTECTION_ENGINE]: {
    SYSTEM_SETTINGS: {
      GET: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/system-settings/GET`,
      GET_ALL: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/system-settings/GET_ALL`,
      REFRESH: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/system-settings/REFRESH`,
      QUERY: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/system-settings/QUERY`,
      UPDATE: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/system-settings/UPDATE`,
      QUERY_LOGS: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/system-settings/QUERY_LOGS`,
    },
    SCAN: {
      INITIATE: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/scan/INITIATE`,
      PLAYGROUND: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/scan-playground/PLAYGROUND`,
    },
    CUSTOMER: {
      SCORE: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/customer/SCORE`,
      GET: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/customer/GET`,
    },
    DATABASE_AUDITS: {
      GET_EXPORTABLE: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/database-audits/GET_EXPORTABLE`,
      RUN_CLEAR_TASK: `${ENDPOINTS.TRAFFIC_PROTECTION_ENGINE}/${process.env.VERSION}/internal/database-audits/RUN_CLEAR_TASK`,
    },
  },
  [ServicesEnum.WHITELABEL_API]: {
    SYSTEM_SETTINGS: {},
  },
  [ServicesEnum.KYC_SERVICE]: {
    ADDRESS: {
      CREATE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/addresses/CREATE`,
      GET: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/addresses/GET`,
      GET_ALL: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/addresses/GET_ALL`,
      UPDATE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/addresses/UPDATE`,
      DELETE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/addresses/DELETE`,
    },
    KYC: {
      INITIATE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/kyc/INITIATE`,
      CREATE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/kyc/CREATE`,
      GET: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/kyc/GET`,
      GET_ALL: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/kyc/GET_ALL`,
      UPDATE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/kyc/UPDATE`,
      DELETE: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/kyc/DELETE`,
    },
    COUNTRY: {
      GET: `${ENDPOINTS.KYC_SERVICE}/${process.env.VERSION}/internal/countries/GET`,
    },
  },
  [ServicesEnum.ON_OFF_RAMP]: {
    AUTH: {
      DELETE_EXPIRED_TOKENS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/auth/DELETE_EXPIRED_TOKENS`,
      CHECK_EXPIRED_TOKENS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/auth/CHECK_EXPIRED_TOKENS`,
    },
    VERIFICATION: {
      CHECK_EXPIRED_VERIFICATIONS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/verifications/CHECK_EXPIRED_VERIFICATIONS`,
      CHECK_EXPIRED_ATTACHMENT_VERIFICATIONS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/verifications/CHECK_EXPIRED_ATTACHMENT_VERIFICATIONS`,
    },
    WEBHOOK: {
      TRANSACTION_UPDATE: `${ENDPOINTS.ON_OFF_RAMP}/v1/transactions/webhook/pg`,
      WEBHOOK_RESULT: `${ENDPOINTS.ON_OFF_RAMP}/v1/transactions/webhook/webhook_result`,
    },
    TRANSACTION: {
      SEND_DC_PENDING_EMAILS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/transactions/SEND_DC_PENDING_EMAILS`,
      SEND_FAILED_TRANSACTION_EMAILS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/transactions/SEND_FAILED_TRANSACTION_EMAILS`,
      CHECK_EXPIRED_TRANSACTION: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/transactions/CHECK_EXPIRED_TRANSACTION`,
      ARCHIVE_INACTIVE_TRANSACTION: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/transactions/ARCHIVE_INACTIVE_TRANSACTION`,
      AVAILABLE_PAYMENT_METHODS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/transactions/gateways`,
    },
    FILE: {
      DELETE_FILES_WITH_NO_ATTACHMENTS: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/files/DELETE_FILES_WITH_NO_ATTACHMENTS`,
    },
    TRAFFIC_PROTECTION: {
      GET_USER_SUMMARY: `${ENDPOINTS.ON_OFF_RAMP}/v1/internal/traffic-protection/USER_SUMMARY`,
    },
  },
};

Object.values(InternalEventsEnum).forEach((service) => {
  const testArr = [];
  Object.values(service).forEach((category) => {
    Object.values(category).forEach((path) => {
      if (testArr.includes(path)) {
        throw new Error(`Duplicate value for path ${path} in InternalEventsEnum`);
      }
      testArr.push(path);
    });
  });
});
