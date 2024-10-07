import { Injectable } from '@nestjs/common';
import { toCamel } from 'snake-camel';
import { ServicesEnum } from '../../../general';
import { InternalEventsEnum } from '../enums/internal.events.enum';
import { rateServiceMocks } from './rate.service.mocks';
import {
  TransactionService,
  externalcryptowallet,
  transactionbatch,
  currency,
  systemSettings,
} from './transaction.service.mocks';
import * as pgMocks from './payment.gateway.mocks';

@Injectable()
export class DefaultClientService {
  private transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  // eslint-disable-next-line class-methods-use-this, consistent-return
  public async request<TData, TResult = any>(event: string, data?: TData): Promise<any> {
    let response;
    let shouldConvertToCamel = true;
    // eslint-disable-next-line default-case
    switch (event) {
      case InternalEventsEnum.PAYMENT_GATEWAY_API.ASSETS.GET_ALL:
        response = await pgMocks.paymentGatewayApiAssetsGetAll();
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.ASSETS.FETCH_DISABLED:
        response = await pgMocks.paymentGatewayApiAssetsFetchDisabled(data);
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.ASSETS.IS_ACTIVE:
        response = await pgMocks.paymentGatewayApiAssetsIsActive(data);
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.ASSETS.UPDATE_STATUS:
        response = await pgMocks.paymentGatewayApiAssetsUpdateStatus(data);
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.SYSTEM_SETTINGS.GET_ALL:
        response = await pgMocks.paymentGatewayApiGetAllSystemSettings(data);
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.MERCHANTS.GET:
        response = await pgMocks.paymentGatewayApiGetMerchant(data);
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.MERCHANT_USERS.GET:
        response = await pgMocks.paymentGatewayApiMerchantUsersGet(data);
        break;
      case InternalEventsEnum.PAYMENT_GATEWAY_API.TRANSACTION.SEND_WEBHOOK:
        response = await pgMocks.paymentGatewayApiSendWebhook(data);
        break;

      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].RATE.GET:
        response = await rateServiceMocks.rate.get((data as any).pair);
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].RATE.GET_DETAILED:
        response = await rateServiceMocks.rate.getDetailed((data as any).pair);
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].RATE.GET_MULTI:
        response = await rateServiceMocks.rate.getMulti(data);
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].RATE.GET_WITH_OHLC:
        response = await rateServiceMocks.rate.getWithOHLC(data);
        break;

      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].PAIRS.GET:
        response = await rateServiceMocks.pairs.get(data);
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].PAIRS.PAGINATE:
        response = rateServiceMocks.pairs.getAll() as any;
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].PAIRS.UPDATE:
        response = await rateServiceMocks.pairs.update(data as any);
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].PAIRS.DELETE:
        response = rateServiceMocks.pairs.delete(data as any) as any;
        break;

      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].SYSTEM_SETTINGS.GET:
        // eslint-disable-next-line no-case-declarations
        const arr = event.split('/');
        response = await rateServiceMocks.systemSettings.get(arr[arr.length - 1]);
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].SYSTEM_SETTINGS.GET_ALL:
        response = rateServiceMocks.systemSettings.getAll() as any;
        break;
      case InternalEventsEnum[ServicesEnum.RATE_SERVICE].SYSTEM_SETTINGS.REFRESH:
        response = rateServiceMocks.systemSettings.clearCache() as any;
        break;

      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.CREATE:
        response = await this.transactionService.create(data as any);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.CREATE_AD_HOC_REFUND:
        response = await this.transactionService.createAdHocRefund(data as any);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.CREATE_REFUND:
        response = this.transactionService.createRefund(data as any) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.UNFREEZE_TRANSACTION:
        response = this.transactionService.unfreezeTransaction() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.FREEZE_TRANSACTION:
        response = this.transactionService.freezeTransaction() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.REJECT:
        response = this.transactionService.reject(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.REJECT_ALERTED_WITHDRAWAL:
        response = this.transactionService.reject(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.ACCEPT_ALERTED_WITHDRAWAL:
        response = this.transactionService.accept(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.BOOK:
        response = this.transactionService.book(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.CLIENT_UPDATE:
        response = await this.transactionService.clientUpdate(data as any);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.ADMIN_UPDATE:
        response = await this.transactionService.adminUpdate(data as any);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_ALL:
        response = this.transactionService.getAll(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET:
        response = await this.transactionService.get(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.ACCEPT_ALERTED_REFUND:
        response = await this.transactionService.get(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.REJECT_ALERTED_REFUND:
        response = await this.transactionService.get(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GENERATE_ACCESS_TOKEN:
        response = this.transactionService.generateAccessToken() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.VALIDATE_ACCESS_TOKEN:
        response = this.transactionService.validateAccessToken() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.COUNT:
        response = this.transactionService.count() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_VOLUME:
        response = this.transactionService.getVolume() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_STATISTICS:
        response = this.transactionService.getStatistics() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_FINANCE_DETAILS:
        response = this.transactionService.getFinanceDetails() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_MERCHANTS_FINANCE_DETAILS:
        response = this.transactionService.getMerchantsFinanceDetails() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_BY_FILTER:
        response = this.transactionService.getByFilter(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_MERCHANTS_STATISTICS:
        response = this.transactionService.getMerchantsStatistics() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION.GET_MERCHANT_USERS_STATISTICS:
        response = this.transactionService.getMerchantUsersStatistics() as any;
        break;

      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].EXTERNAL_CRYPTO_WALLET.CREATE:
        response = externalcryptowallet.create(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].EXTERNAL_CRYPTO_WALLET.GET:
        response = externalcryptowallet.get() as any;
        break;

      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.CREATE:
        response = await transactionbatch.create();
        shouldConvertToCamel = false;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.GET:
        response = await transactionbatch.get();
        shouldConvertToCamel = false;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.GET_ALL:
        response = transactionbatch.getAll() as any;
        shouldConvertToCamel = false;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.UPDATE:
        response = transactionbatch.update() as any;
        shouldConvertToCamel = false;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.DELETE:
        response = transactionbatch.delete() as any;
        shouldConvertToCamel = false;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.RUN_BATCH_TASK:
        response = transactionbatch.queueDraftBatchTask() as any;
        shouldConvertToCamel = false;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].TRANSACTION_BATCH.PAYOUT:
        response = await transactionbatch.payout(data);
        shouldConvertToCamel = false;
        break;

      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].DEPOSIT_WALLET.GENERATE:
        response = this.transactionService.getDepositWallet(data) as any;
        break;

      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].CURRENCY.CREATE:
        response = await currency.create(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].CURRENCY.GET_ONE:
        response = await currency.getOne(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].CURRENCY.GET_ALL:
        response = currency.getAll(data) as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].CURRENCY.UPDATE:
        response = await currency.update(data);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].CURRENCY.DELETE:
        response = currency.delete() as any;
        break;

      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].SYSTEM_SETTINGS.GET:
        response = await systemSettings.get(arr[arr.length - 1]);
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].SYSTEM_SETTINGS.GET_ALL:
        response = systemSettings.getAll() as any;
        break;
      case InternalEventsEnum[ServicesEnum.TRANSACTION_SERVICE].SYSTEM_SETTINGS.REFRESH:
        response = systemSettings.clearCache() as any;
        break;
    }

    return shouldConvertToCamel ? toCamel(response) : response;
  }

  public async sendNotification() {
    //
  }
}
