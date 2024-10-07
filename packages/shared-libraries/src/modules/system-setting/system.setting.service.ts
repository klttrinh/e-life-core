import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeeLevel } from 'fireblocks-sdk';
import { isArray, isBoolean, isEnum, isNumber, isObject } from 'class-validator';
import { CacheService } from '../../cache';
import { MailClientTypeEnum } from '../../integrations';
import { RateSourceEnum } from '../../interfaces';
import { CreditOrderServiceTypeEnum, CurrencyTypeEnum, FiatEnum, PaginationQueryDto, ProductEnum } from '../../models';
import { isDefined, money } from '../../utils';
import { paginate } from '../../utils/db.utils';
import { DefaultClientService, InternalEventsEnum } from '../default-client';
import { SystemSettingsEnum } from './enums/system.settings.enum';
import { SystemSetting } from './models/system-setting.model';
import { ServicesEnum } from '../../general';
import { UpdateSystemSettingsDto } from './dtos/update.system.settings.dto';
import { globalSettings } from '../../config/index';
import { SystemSettingsLogsService } from './logs/system.settings.logs.service';
import { SystemSettingValueTypeEnum } from './enums/system.setting.value.type.enum';

type EventName = 'update';

@Injectable()
export class SystemSettingService {
  private readonly listeners: { [key in EventName]?: (() => void)[] } = {};

  protected readonly logger = new Logger(SystemSettingService.name);

  constructor(
    @InjectModel(SystemSetting) private readonly systemSettingModel: typeof SystemSetting,
    private client: DefaultClientService,
    protected cacheService: CacheService,
    private settingsLogService: SystemSettingsLogsService,
  ) {
    systemSettingModel
      .addHook('afterCreate', async () => {
        await this.emitDBUpdate();
        this.emitCacheUpdate();
      })
      .addHook('afterUpdate', async () => {
        await this.emitDBUpdate();
        this.emitCacheUpdate();
      })
      .addHook('afterDestroy', async () => {
        await this.emitDBUpdate();
        this.emitCacheUpdate();
      });
  }

  public async getTransactionAccessTokenTTL(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.TRANSACTION_ACCESS_TOKEN_TTL));
  }

  public async getOnRampTransactionAcceptedToCompletedDelay(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.ONRAMP_STATUS_ACCEPTED_TO_COMPLETED_DELAY));
  }

  /**
   * only for non production environments
   */
  public async isCreditOrderEnabled(): Promise<boolean> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.CREDIT_ORDER_ENABLED));
  }

  public async getBelowThresholdNotificationEmails(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.BELOW_THRESHOLD_NOTIFICATION_EMAILS));
  }

  public async getDefaultCreditOrderService(): Promise<CreditOrderServiceTypeEnum> {
    return (await this.getSystemSetting(SystemSettingsEnum.DEFAULT_CREDIT_ORDER_SERVICE)) as CreditOrderServiceTypeEnum;
  }

  public async getAdminNotificationTypes(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.ADMIN_NOTIFICATION_TYPES));
  }

  public async getRateProviderSources(): Promise<RateSourceEnum[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.RATE_PROVIDERS));
  }

  public async getRateSuspectionDiff(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.RATE_SUSPECTION_DIFF));
  }

  public async getStoragePath(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.STORAGE_PATH);
  }

  public async getTemplateForAlerted(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_ALERTED);
  }

  public async getTemplateForFailed(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_FAILED);
  }

  public async getTemplateForBalanceManagementSuccessfulDeposit(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.BALANCE_MANAGEMENT_DEPOSIT_SUCCESSFUL_EMAIL_TEMPLATE);
  }

  public async getTemplateForBalanceManagementSuccessfulWithdrawal(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.BALANCE_MANAGEMENT_WITHDRAWAL_SUCCESSFUL_EMAIL_TEMPLATE);
  }

  public async getTemplateForBalanceManagementPayoutConfirmed(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.BALANCE_MANAGEMENT_PAYOUT_CONFIRMED_EMAIL_TEMPLATE);
  }

  public async getTemplateForBalanceManagementSuccessfulExchange(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.BALANCE_MANAGEMENT_EXCHANGE_SUCCESSFUL_EMAIL_TEMPLATE);
  }

  public async getTemplateForSkippedCreditOrder(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_SKIPPED_CREDIT_ORDER);
  }

  public async getTemplateForRejected(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_REJECTED);
  }

  public async getNoMatchEmailEnabled(): Promise<boolean> {
    return Boolean(this.getSystemSetting(SystemSettingsEnum.NO_MATCH_EMAIL_ENABLED));
  }

  public async getAlertedEmailEnabled(): Promise<boolean> {
    return Boolean(this.getSystemSetting(SystemSettingsEnum.ALERTED_EMAIL_ENABLED));
  }

  public async getRejectedEmailEnabled(): Promise<boolean> {
    return Boolean(this.getSystemSetting(SystemSettingsEnum.REJECTED_EMAIL_ENABLED));
  }

  public async getFailedEmailEnabled(): Promise<boolean> {
    return Boolean(this.getSystemSetting(SystemSettingsEnum.FAILED_EMAIL_ENABLED));
  }

  public async getNoMatchEmailRecipients(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.NO_MATCH_EMAIL_RECIPIENTS));
  }

  public async getSkippedCreditOrderEmailRecipients(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.SKIPPED_CREDIT_ORDER_EMAIL_RECIPIENTS));
  }

  public async getAlertedEmailRecipients(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.ALERTED_EMAIL_RECIPIENTS));
  }

  public async getRejectedEmailRecipients(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.REJECTED_EMAIL_RECIPIENTS));
  }

  public async getFailedEmailRecipients(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.FAILED_EMAIL_RECIPIENTS));
  }

  public async getOnOffRampIpWhitelist(): Promise<string[]> {
    const ips = await this.getSystemSetting(SystemSettingsEnum.ON_OFF_RAMP_IP_WHITELIST);
    return ips?.length ? ips.split(',') : ['*'];
  }

  public async getMaintenanceModeIpWhitelist(): Promise<string[]> {
    const ips = await this.getSystemSetting(SystemSettingsEnum.MAINTENANCE_MODE_IP_WHITELIST);
    return ips?.length ? ips.split(',') : ['*'];
  }

  public async getIpBlacklistedCountriesIso2(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.IP_BLACK_LISTED_COUNTRIES_ISO_2));
  }

  public async getTemplateForNoMatch(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.XCOINS_SUPPORT_EMAIL_TEMPLATE_NO_MATCH);
  }

  public async getDefaultMailClient(): Promise<MailClientTypeEnum> {
    return (await this.getSystemSetting(SystemSettingsEnum.DEFAULT_EMAIL_CLIENT)) as MailClientTypeEnum;
  }

  public async getWebhookDelayPattern(): Promise<number[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.WEBHOOK_DELAY_PATTERN));
  }

  public async getGoogleSecretName(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.GOOGLE_SECRET_NAME);
  }

  public async getWithdrawalFeeLevel(): Promise<FeeLevel> {
    return (await this.getSystemSetting(SystemSettingsEnum.WITHDRAWAL_FEE_LEVEL)) as FeeLevel;
  }

  public async getRefundFeeLevel(): Promise<FeeLevel> {
    return (await this.getSystemSetting(SystemSettingsEnum.REFUND_FEE_LEVEL)) as FeeLevel;
  }

  public async getAdminGoogleSecretName(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.ADMIN_GOOGLE_SECRET_NAME);
  }

  public async getMerchantGoogleSecretName(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.MERCHANT_GOOGLE_SECRET_NAME);
  }

  public async getAwsS3Bucket(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.AWS_S3_BUCKET);
  }

  public async getMaxTransactionBatchSize(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_TRANSACTION_BATCH_SIZE));
  }

  public async isAdmin2FAEnabled(): Promise<boolean> {
    return (await this.getSystemSetting(SystemSettingsEnum.ENFORCE_ADMIN_2FA)) === 'true';
  }

  public async getDefaultCreditOrderCurrency(): Promise<FiatEnum> {
    return (await this.getSystemSetting(SystemSettingsEnum.DEFAULT_CREDIT_ORDER_CURRENCY)) as FiatEnum;
  }

  public async getFromEmail(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.DEFAULT_FROM_EMAIL, { defaultValue: '' });
  }

  public async getFromName(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.DEFAULT_FROM_NAME, { defaultValue: '' });
  }

  public async getSystemAdminEmails(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.SYSTEM_ADMIN_EMAILS)) as string[];
  }

  public async getAdminDashboardUrl(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.ADMIN_DASHBOARD_URL);
  }

  public async getMerchantDashboardUrl(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.MERCHANT_DASHBOARD_URL);
  }

  public async getOnOffRampAllowedCurrencies(callerService: ServicesEnum): Promise<number[]> {
    return JSON.parse(
      await this.getSystemSetting(SystemSettingsEnum.ON_OFF_RAMP_ALLOWED_CURRENCIES, {
        product: callerService !== ServicesEnum.PAYMENT_GATEWAY_API ? ProductEnum.PAYMENT_GATEWAY : undefined,
      }),
    ) as number[];
  }

  public async getOnOffRampMinimumAllowedAmount(callerService: ServicesEnum): Promise<string> {
    return JSON.parse(
      await this.getSystemSetting(SystemSettingsEnum.ON_OFF_RAMP_MINIMUM_ALLOWED_AMOUNT, {
        product: callerService !== ServicesEnum.PAYMENT_GATEWAY_API ? ProductEnum.PAYMENT_GATEWAY : undefined,
      }),
    ) as string;
  }

  public async getCreditOrderRetryCount(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.CREDIT_ORDER_RETRY_COUNT));
  }

  public async getCreditOrderRetryDelay(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.CREDIT_ORDER_RETRY_DELAY));
  }

  public async getTimeToArchiveInactiveTransaction(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.TIME_TO_ARCHIVE_INACTIVE_TRANSACTION));
  }

  public async isMaintenanceModeEnabled(): Promise<boolean> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.MAINTENANCE_MODE_ENABLED));
  }

  public async getRateLockLimit(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.RATE_LOCK_LIMIT_IN_SEC, { product: ProductEnum.PAYMENT_GATEWAY });
  }

  public async getKycDepositLimitPassedEmailTemplate(): Promise<string> {
    return this.getSystemSetting(SystemSettingsEnum.KYC_DEPOSIT_LIMIT_PASSED_EMAIL_TEMPLATE);
  }

  public async getKycDepositLimitPassedEmailList(): Promise<string[]> {
    const emails = await this.getSystemSetting(SystemSettingsEnum.KYC_DEPOSIT_LIMIT_PASSED_EMAILS_LIST);
    return JSON.parse(emails);
  }

  public async getHookSendTimeout(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEND_HOOK_REQUEST_TIMEOUT));
  }

  public async getNumberOfRefundRetries(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.REFUND_NUMBER_OF_RETRIES));
  }

  public async getNumberOfWithdrawalRetries(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.WITHDRAWAL_NUMBER_OF_RETRIES));
  }

  public async getBackoffDelayOfWithdrawalJob(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.BACKOFF_DELAY_OF_WITHDRAWAL_JOB_IN_MILLISECONDS));
  }

  public async getFireblocksIpWhitelist(): Promise<string> {
    return (await this.getSystemSetting(SystemSettingsEnum.FIREBLOCKS_IP_WHITELIST)) || '*';
  }

  public async getForgotPasswordTokenTTL(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.FORGOT_PASSWORD_TOKEN_TTL));
  }

  public async getEllipticAmlCheckForTransactionInitDelay(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.ELLIPTIC_AML_CHECK_INITIAL_DELAY_IN_MILLI_SECONDS));
  }

  public async getEllipticAmlCheckForTransactionBackoffDelay(): Promise<number> {
    return Number(await this.getSystemSetting(SystemSettingsEnum.ELLIPTIC_AML_CHECK_BACKOFF_DELAY_IN_MILLI_SECONDS));
  }

  public async getCryptoApisInitialDelay(): Promise<number> {
    return Number((await this.getSystemSetting(SystemSettingsEnum.CRYPTO_APIS_INITIAL_DELAY)) || 5000);
  }

  public async getCryptoApisRetryDelay(): Promise<number> {
    return Number((await this.getSystemSetting(SystemSettingsEnum.CRYPTO_APIS_RETRY_DELAY)) || 1000);
  }

  public async admin2FAEnforcable(): Promise<boolean> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.ENFORCE_ADMIN_2FA)) === true;
  }

  public async getSeonMaxScorePlatinum() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEON_SCORE_PLATINUM));
  }

  public async getSeonMaxScoreGold() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEON_SCORE_GOLD));
  }

  public async getSeonMaxScoreSilver() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEON_SCORE_SILVER));
  }

  public async getSeonMaxBlackBoxScorePlatinum() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEON_BLACK_BOX_SCORE_PLATINUM));
  }

  public async getSeonMaxBlackBoxScoreGold() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEON_BLACK_BOX_SCORE_GOLD));
  }

  public async getSeonMaxBlackBoxScoreSilver() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.SEON_BLACK_BOX_SCORE_SILVER));
  }

  public async getKountMaxOmniScorePlatinum() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.KOUNT_OMNI_SCORE_PLATINUM));
  }

  public async getKountMaxOmniScoreGold() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.KOUNT_OMNI_SCORE_GOLD));
  }

  public async getKountMaxOmniScoreSilver() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.KOUNT_OMNI_SCORE_SILVER));
  }

  public async getKountMaxPersonaScorePlatinum() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.KOUNT_PERSONA_SCORE_PLATINUM));
  }

  public async getKountMaxPersonaScoreGold() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.KOUNT_PERSONA_SCORE_GOLD));
  }

  public async getKountMaxPersonaScoreSilver() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.KOUNT_PERSONA_SCORE_SILVER));
  }

  public async getMaxInternalTransactionDuration() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DURATION_TRANSACTION_HISTORY_INTERNAL));
  }

  public async getMaxExternalTransactionDuration() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DURATION_TRANSACTION_HISTORY_EXTERNAL));
  }

  public async getMaxUSCardsCount() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DIFFERENT_CARD_HASHES_US));
  }

  public async getMaxEUCardsCount() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DIFFERENT_CARD_HASHES_EU));
  }

  public async getMaxDevicesCountPlatinum() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DEVICES_PLATINUM));
  }

  public async getMaxDevicesCountGold() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DEVICES_GOLD));
  }

  public async getMaxDevicesCountSilver() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.MAX_DEVICES_SILVER));
  }

  public async getRateDifferenceThreshold() {
    return Number(await this.getSystemSetting(SystemSettingsEnum.RATE_DIFFERENCE_THRESHOLD));
  }

  public async getRateNotificationRecipients(): Promise<string[]> {
    return JSON.parse(await this.getSystemSetting(SystemSettingsEnum.RATE_NOTIFICATIONS_RECIPIENTS));
  }

  public async shouldShowOnOffRamp(
    merchant: { onOffRampEnabled: boolean },
    transaction: {
      onrEnabled: boolean;
      fromCurrencyType: CurrencyTypeEnum | string;
      fromCurrencyId: number;
      toCurrencyId: number;
      amountTo: number | string;
    },
    callerService: ServicesEnum,
  ): Promise<{ showOnOffRamp: boolean; reason: string }> {
    if (!merchant.onOffRampEnabled) return { showOnOffRamp: false, reason: 'ONR is disabled for this merchant' };

    if (!transaction.onrEnabled) return { showOnOffRamp: false, reason: 'ONR is disabled for this transaction' };

    const [minimumAllowedAmountForOnOffRamp, OnOffRampAllowedCurrencies] = await Promise.all([
      this.getOnOffRampMinimumAllowedAmount(callerService),
      this.getOnOffRampAllowedCurrencies(callerService),
    ]);

    if (money(transaction.amountTo).isLessThan(minimumAllowedAmountForOnOffRamp)) {
      return { showOnOffRamp: false, reason: 'Transaction amount is less than minimum allowed for on-off ramp' };
    }

    const fiatCurrencyId =
      transaction.fromCurrencyType === CurrencyTypeEnum.FIAT ? transaction.fromCurrencyId : transaction.toCurrencyId;

    let reason = '';
    let showOnOffRamp = true;

    if (!isDefined(fiatCurrencyId)) {
      showOnOffRamp = false;
      reason = 'Fiat currency is not defined';
    } else if (!OnOffRampAllowedCurrencies.includes(Number(fiatCurrencyId))) {
      showOnOffRamp = false;
      reason = 'Currency is not allowed by on-off ramp';
    }

    return { showOnOffRamp, reason };
  }

  public on(event: EventName, callback: () => void) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);
  }

  // eslint-disable-next-line class-methods-use-this
  protected getPrefix(): string {
    return 'setting';
  }

  protected async emitDBUpdate() {
    await this.clearCache();
    if (globalSettings.serviceType !== ServicesEnum.TRANSACTION_SERVICE) {
      await this.clearTransactionServiceCache().catch(this.logger.error);
    }
    if (globalSettings.serviceType !== ServicesEnum.RATE_SERVICE) {
      await this.clearRateServiceCache().catch(this.logger.error);
    }
    if (globalSettings.serviceType !== ServicesEnum.TRAFFIC_PROTECTION_ENGINE) {
      await this.clearTrafficProtectionEngineCache().catch(this.logger.error);
    }
  }

  protected emitCacheUpdate() {
    this.listeners.update?.forEach((callback) => {
      try {
        callback();
      } catch (e) {
        this.logger.log(e);
      }
    });
  }

  public async remoteServiceUpdated() {
    await this.clearCache();
    this.emitCacheUpdate();
  }

  protected createCacheKey(key: string, product?: ProductEnum) {
    return `${product || this.getPrefix()}_${key}`;
  }

  private async save(key: string, value: string | number): Promise<void> {
    try {
      await this.cacheService.set(key, value, { ttl: 0 });
    } catch (e) {
      this.logger.log(e);
    }
  }

  public async getSystemSetting(
    key: SystemSettingsEnum,
    { product, defaultValue }: { product?: ProductEnum; defaultValue?: string; onlyVisible?: boolean } = {},
  ): Promise<string> {
    const cacheKey = this.createCacheKey(key, product);
    let cachedSetting: string = await this.cacheService.get(cacheKey);
    if (!cachedSetting) {
      if (product) {
        await this.fetchSystemSettingsFromProduct(product);
        cachedSetting = await this.cacheService.get(cacheKey);
      } else {
        const setting: SystemSetting = await this.findOne(key).catch((e) => {
          if (!isDefined(defaultValue)) {
            throw e;
          }
          return undefined;
        });
        if (setting) {
          await this.save(cacheKey, setting.value);
          cachedSetting = setting.value;
        }
      }
    }

    if (!cachedSetting) {
      if (defaultValue === undefined) {
        throw new NotFoundException(`cache key ${cacheKey} not found`);
      }
      return defaultValue;
    }

    return cachedSetting;
  }

  public async querySystemSettings(query: PaginationQueryDto): Promise<{ count: number; rows: SystemSetting[] }> {
    // eslint-disable-next-line no-underscore-dangle
    return paginate<SystemSetting>(this.systemSettingModel, query._start, query._end, {
      // eslint-disable-next-line no-underscore-dangle
      sort: query._sort,
      // eslint-disable-next-line no-underscore-dangle
      order: query._order,
      where: {
        visible: true,
      },
    });
  }

  public async findOne(key: SystemSettingsEnum, onlyVisible = false): Promise<SystemSetting> {
    const setting = await this.systemSettingModel.findOne({
      where: {
        key,
      },
      raw: true,
    });

    if (!setting) {
      this.logger.error(`${key} not found`);

      throw new NotFoundException(`${key} not found`);
    }

    if (onlyVisible && !setting.visible) {
      throw new BadRequestException(`system setting with key ${key} is not visible`);
    }

    return setting;
  }

  public async delete(key: SystemSettingsEnum): Promise<string> {
    const setting = await this.systemSettingModel.findOne({
      where: {
        key,
      },
    });

    if (!setting) {
      this.logger.error(`${key} not found`);
      throw new NotFoundException();
    }
    await setting.destroy();
    return 'Deleted';
  }

  public async findAll(): Promise<SystemSetting[]> {
    return this.systemSettingModel.findAll({ where: {}, raw: true, nest: true });
  }

  public async update({ setting, initiator }: UpdateSystemSettingsDto): Promise<void> {
    const systemSetting = await this.systemSettingModel.findOne({ where: { key: setting.key } });

    if (!setting) {
      this.logger.error(`${setting.key} not found`);
      throw new NotFoundException(`${setting.key} not found`);
    }

    if (!systemSetting.editable) {
      throw new BadRequestException(`setting ${setting.key} is not editable`);
    }

    let matches;
    try {
      switch (systemSetting.type) {
        case SystemSettingValueTypeEnum.Enum:
          matches = systemSetting.enum.includes(setting.value);
          break;
        case SystemSettingValueTypeEnum.EnumArray:
          matches =
            isArray(JSON.parse(setting.value)) &&
            !JSON.parse(setting.value).some((v) => !systemSetting.enum.includes(v));
          break;
        case SystemSettingValueTypeEnum.String:
          matches = true;
          break;
        case SystemSettingValueTypeEnum.StringArray:
          matches = isArray(JSON.parse(setting.value));
          break;
        case SystemSettingValueTypeEnum.Boolean:
          matches = isBoolean(JSON.parse(setting.value));
          break;
        case SystemSettingValueTypeEnum.Object:
          matches = isObject(JSON.parse(setting.value));
          break;
        case SystemSettingValueTypeEnum.HTML:
          matches = setting.value.startsWith('<') && setting.value.endsWith('>');
          break;
        case SystemSettingValueTypeEnum.Integer:
          matches = isNumber(Number(setting.value)) && !Number.isNaN(Number(setting.value));
          break;
        case SystemSettingValueTypeEnum.IntegerArray:
          matches =
            isArray(JSON.parse(setting.value)) &&
            !(JSON.parse(setting.value) as any[]).some((val) => !(isNumber(Number(val)) && !Number.isNaN(Number(val))));
          break;
        default:
          break;
      }
    } catch (e) {
      this.logger.warn(e);
      matches = false;
    }

    if (!matches) {
      throw new BadRequestException(`system setting's data type does not match`);
    }

    const logSession = this.settingsLogService.beginManualUpdate({
      initiator,
      dto: setting,
      setting: systemSetting,
    });

    await systemSetting.update({ value: setting.value });

    await logSession.end();
  }

  protected async fetchSystemSettingsFromProduct(product: ProductEnum): Promise<string> {
    // make call to settings api from product, and update cache
    const remote =
      product === ProductEnum.PAYMENT_GATEWAY
        ? InternalEventsEnum.PAYMENT_GATEWAY_API.SYSTEM_SETTINGS.GET_ALL
        : undefined; // TODO when needed

    this.logger.warn(`Refreshing ${product} settings`);
    await this.cacheService.del(`${product}_*`);

    await this.client.request(remote).then(async (data: any) => {
      this.logger.log(`Updating ${product} settings`);

      if (!Array.isArray(data)) {
        throw new InternalServerErrorException('Not an array!');
      }

      await Promise.all(
        data.map((item) => {
          if (!isDefined(item.key) || !isDefined(item.value)) {
            return;
          }
          return this.save(this.createCacheKey(item.key, product), item.value);
        }),
      );
    });

    return 'done';
  }

  public async clearCache(): Promise<void> {
    const keys: string[] = (await this.cacheService.store.keys('*')).filter(
      (key) =>
        !key.includes('bull') &&
        !key.startsWith('rate:') &&
        !key.startsWith('transaction-tokens-') &&
        !key.startsWith('email_token#') &&
        !key.startsWith('merchant-withdrawal-balance#') &&
        !key.startsWith('merchant-withdrawal-balance-limit#') &&
        !key.startsWith(`update-interval:`),
    );
    this.logger.log(`Deleting keys from redis`, { keys });
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys) {
      // eslint-disable-next-line no-await-in-loop
      await this.cacheService.del(key);
    }
  }

  public async clearTransactionServiceCache(): Promise<void> {
    await this.client.request(InternalEventsEnum.TRANSACTION_SERVICE.SYSTEM_SETTINGS.REFRESH);
  }

  public async clearRateServiceCache(): Promise<void> {
    await this.client.request(InternalEventsEnum.RATE_SERVICE.SYSTEM_SETTINGS.REFRESH);
  }

  public async clearTrafficProtectionEngineCache(): Promise<void> {
    await this.client.request(InternalEventsEnum.TRAFFIC_PROTECTION_ENGINE.SYSTEM_SETTINGS.REFRESH);
  }

  /* public async upsert(body: UpsertSystemSettingDto): Promise<SystemSetting> {
  let setting = await this.systemSettingModel.findOne({
    where: {
      [Op.or]: [{ id: body.id || 0 }, { key: body.key }],
    },
  });

  if (setting) {
    await setting.update({ value: body.value });
    await this.clearCache();
    this.emitUpdate();
    return setting;
  }

  setting = await this.systemSettingModel.create({
    key: body.key,
    value: body.value,
  });
  await this.clearCache();
  this.emitUpdate();
  return setting;
} */
}
