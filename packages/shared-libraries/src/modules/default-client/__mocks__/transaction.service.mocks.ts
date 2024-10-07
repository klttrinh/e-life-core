import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { IMerchantTransactionFinanceResponse } from '../../../interfaces/transaction.finance';

const randomInt = () => faker.number.int({ min: 10, max: 100 });
const randomFloat = () => faker.number.float({ min: 0.1, max: 1.0 });

const createTransaction = (data?: any): any => {
  return {
    id: randomInt(),
    product: 'PAYMENT_GATEWAY',
    payment_provider: 'FIREBLOCKS',
    from_user_id: data.sender.id,
    from_user_type: data.sender.type,
    to_user_id: data.receiver.id,
    to_user_type: data.receiver.type,
    from_currency_id: randomInt(),
    processing_fee: `${randomFloat()}`, // percentage
    processing_fee_amount: `${randomFloat()}`,
    external_fee: `${randomFloat()}`,
    to_currency_id: randomInt(),
    fromCurrency: randomInt(),
    toCurrency: randomInt(),
    amount_from: randomInt(), // crypto
    amount_to: randomInt(), // fiat
    net_settlement_amount: `${randomFloat()}`,
    original_amount_from: `${randomFloat()}`,
    total_risk_score: randomInt(),
    aml_status: 'ACCEPTED',
    rate_expires_at: new Date().getTime() + 10 * 60 * 60 * 1000,
    rate: `${randomFloat()}`, // rate * amount_from  =  amount_to
    from_wallet_address: 'FROM_WALLET_ADDRESS',
    tag: '',
    to_wallet_address: 'TO_WALLET_ADDRESS',
    network_fee: `${randomFloat()}`,
    estimated_network_fee: `${faker.number.int({ min: 10000000000, max: 10000000000000 })}`, // wei
    transaction_size: 1, // for btc like tokens
    network_fee_type: '',
    transaction_type: 'DEPOSIT',
    status: 'ACCEPTED',
    provider_status: 'COMPLETED',
    provider_reference: faker.string.uuid(), // id of transaction on provider for example on fireblocks
    refunded_transaction_id: null, // id of transaction that this transaction is refund of
    refunded_transaction: null,
    description: 'Mock Transaction',
    additional_info: '',
    status_reason: '',
    transaction_hash: 'TransactionHash',
    number_of_confirmations: faker.number.int({ min: 1, max: 10 }),
    transaction_logs: '',
    webhook_logs: '',
    aml: '',
    external_reference: 'TransactionExternalReference', // id of the transaction in the merchant's database
    look_up_id: randomUUID(), // public id of the transaction in our database
    no_match: false,
    frozen: false, // if the transaction is frozen on fireblocks
    amount_update_enabled: true,
    webhook_notification_enabled: false,
    credit_order_id: randomInt(),
    credit_order_status: 'SUCCESSFUL',
    credit_order_details: {},
    credit_rate: `${randomFloat()}`,
    credit_fee: `${randomFloat()}`,
    batch_id: randomInt(),
    batch: '',
    settlement_rate_eur: randomFloat(),
    settlement_rate_gbp: randomFloat(),
    settlement_rate_usd: randomFloat(),
    settlement_currency: 'USD',
    booking_currency: 'BTC',
    settlement_spread: randomInt(),
    settlement_amount: `${randomInt()}`,
    booking_rate: randomFloat(),
    created_at: new Date(),
    completed_at: new Date(),
    updated_at: new Date(),
    ...data,
  };
};

const createTransactionBatch = (data?: any) => {
  return {
    id: randomInt(),
    batch_number: randomInt(),
    description: 'Mocked Batched Transaction',
    batch_date: new Date(),
    completion_date: new Date(),
    merchant_settlement_currency: 'BTC',
    settlement_due_date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
    type: 'BATCH',
    merchant_id: randomInt(),
    total_net_settlement_amount: randomFloat(),
    total_settlement_amount: randomFloat(),
    total_processing_fee_amount: randomFloat(),
    to_currency_id: randomInt(),
    payout_fee: randomInt(),
    external_fee: randomInt(),
    total_network_fee: randomInt(),
    created_at: new Date(),
    updated_at: new Date(),
    total_eur: 5,
    ...data,
  };
};

const createCurrency = (data?: any) => {
  return {
    id: 13,
    name: 'bitcoin',
    currency_type: 'CRYPTO',
    status: 'ACTIVE',
    currency_code: 'BTC',
    fireblocks_ref: 'ref',
    network: 'main',
    blockchain: 'bitcoin',
    protocol: '',
    symbol: 'BTC',
    precision: randomFloat(),
    scale: 2,
    ...data,
  };
};

const cache = {
  settings: {},
  rates: {},
};
export class TransactionService {
  private transactions = [];

  create(data) {
    const transaction = createTransaction(data);
    this.transactions.push(transaction);
    return transaction;
  }

  createAdHocRefund(data) {
    return createTransaction({
      transaction_type: 'AD_HOC_REFUND',
      processing_fee: `${randomInt()}`,
      net_settlement_amount: randomInt(),
      settlement_amount: randomInt(),
      amount_from: randomInt(),
      amount_to: randomInt(),
      external_fee: randomInt(),
      processing_fee_amount: `${randomInt()}`,
      sender: { id: data.initiator.id, type: 'XCOINS' },
      receiver: { id: data.merchantId, type: 'MERCHANT_USER' },
      description: data.description,
      product: 'PAYMENT_GATEWAY',
      status: 'COMPLETED',
      booking_currency: null,
      settlement_currency: data.fiatCurrency,
      settlement_spread: randomInt(),
      ...data,
    });
  }

  createRefund(_data) {
    return 'Transaction Refund Initiated';
  }

  unfreezeTransaction() {
    return { success: 'Transaction unfreeze successful' };
  }

  freezeTransaction(): { success: string } {
    return { success: 'Transaction freeze successful' };
  }

  reject(data) {
    return this.get(data);
  }

  accept(data) {
    return this.get(data);
  }

  book(data) {
    return this.get(data);
  }

  clientUpdate(data) {
    return this.transactions.find((transaction) => transaction.look_up_id === data.id);
  }

  adminUpdate(data) {
    return this.transactions.find((transaction) => transaction.id === data.id);
  }

  getAll(data) {
    return { rows: this.transactions, count: this.transactions.length };
  }

  get(data) {
    return this.transactions.find((transaction) =>
      data.id ? transaction.id === Number(data.id) : transaction.look_up_id === data.transactionId,
    );
  }

  generateAccessToken() {
    return randomUUID();
  }

  validateAccessToken() {
    return true;
  }

  count() {
    return { total: 1, details: {}, currencyCode: 'BTC' };
  }

  getVolume() {
    return {
      details: {
        eur: { value: randomInt(), percentage: randomInt(), currencySymbol: '€' },
        usd: { value: randomInt(), percentage: randomInt(), currencySymbol: '$' },
        gbp: { value: randomInt(), percentage: randomInt(), currencySymbol: '£' },
      },
    };
  }

  getStatistics() {
    return {
      numberOfNoMatchTransactions: randomInt(),
      numberOfRejectedDepositTransactions: randomInt(),
      numberOfFailedTransactions: randomInt(),
      numberOfAlertedTransactions: randomInt(),
      numberOfFailedRefunds: randomInt(),
      numberOfFailedCreditOrders: randomInt(),
    };
  }

  createPayout(data) {
    return createTransaction({
      amount_from: `${randomInt()}`,
      processing_fee: `${randomInt()}`,
      look_up_id: randomUUID(),
      settlement_rate_eur: randomInt(),
      settlement_rate_gbp: randomInt(),
      settlement_rate_usd: randomInt(),
      booking_rate: randomInt(),
      ...data,
    });
  }

  getFinanceDetails() {
    return {
      averageRevenuePerMerchant: '123.32',
      averageRevenuePerUser: '18.88',
      averageRevenuePerTransactions: '32.06',
      numberOfTransactions: '527',
      depositVolume: {
        azn: {
          value: '23.61',
          percentage: '0.0',
          currencySymbol: '₼',
        },
        bdt: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '৳',
        },
        brl: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'R$',
        },
        cad: {
          value: '150.00',
          percentage: '0.3',
          currencySymbol: 'C$',
        },
        clp: {
          value: '85028.67',
          percentage: '0.3',
        },
        eur: {
          value: '30712.02',
          percentage: '86.3',
          currencySymbol: '€',
        },
        gbp: {
          value: '1791.31',
          percentage: '5.8',
          currencySymbol: '£',
        },
        jpy: {
          value: '0',
          percentage: '0.0',
          currencySymbol: '¥',
        },
        krw: {
          value: '19286',
          percentage: '0.0',
          currencySymbol: '₩',
        },
        nok: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'kr',
        },
        nzd: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'NZ$',
        },
        pen: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'S/',
        },
        thb: {
          value: '97.12',
          percentage: '0.0',
          currencySymbol: '฿',
        },
        usd: {
          value: '2800.44',
          percentage: '7.3',
          currencySymbol: '$',
        },
        numberOfTransactions: '430',
        processingFee: '15596.95',
        revenue: '15646.99',
        settlementSpread: '50.04',
        totalEur: '35583.39',
      },
      withdrawalVolume: {
        azn: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '₼',
        },
        bdt: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '৳',
        },
        brl: {
          value: '200.00',
          percentage: '0.1',
          currencySymbol: 'R$',
        },
        cad: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'C$',
        },
        clp: {
          value: '0.00',
          percentage: '0.0',
        },
        eur: {
          value: '25959.10',
          percentage: '99.9',
          currencySymbol: '€',
        },
        gbp: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '£',
        },
        jpy: {
          value: '0',
          percentage: '0.0',
          currencySymbol: '¥',
        },
        krw: {
          value: '1000',
          percentage: '0.0',
          currencySymbol: '₩',
        },
        nok: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'kr',
        },
        nzd: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'NZ$',
        },
        pen: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'S/',
        },
        thb: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '฿',
        },
        usd: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '$',
        },
        numberOfTransactions: '80',
        processingFee: '917.54',
        revenue: '917.95',
        settlementSpread: '0.40',
        totalEur: '25997.86',
      },
      refundVolume: {
        azn: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '₼',
        },
        bdt: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '৳',
        },
        brl: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'R$',
        },
        cad: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'C$',
        },
        clp: {
          value: '0.00',
          percentage: '0.0',
        },
        eur: {
          value: '6006.74',
          percentage: '100.0',
          currencySymbol: '€',
        },
        gbp: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '£',
        },
        jpy: {
          value: '0',
          percentage: '0.0',
          currencySymbol: '¥',
        },
        krw: {
          value: '0',
          percentage: '0.0',
          currencySymbol: '₩',
        },
        nok: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'kr',
        },
        nzd: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'NZ$',
        },
        pen: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: 'S/',
        },
        thb: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '฿',
        },
        usd: {
          value: '0.00',
          percentage: '0.0',
          currencySymbol: '$',
        },
        numberOfTransactions: '17',
        processingFee: '330.37',
        revenue: '330.37',
        settlementSpread: '0.00',
        totalEur: '6006.74',
      },
      numberOfMerchants: '137',
      numberOfMerchantUsers: '895',
      totalProcessingFees: '16844.87',
      totalRevenue: '16895.31',
      totalSettlementSpread: '50.44',
      totalBalanceDetails: {
        totalEur: '-252251.41',
        eur: {
          value: '-255013.76',
          percentage: '101.1',
          currencySymbol: '€',
        },
        gbp: {
          value: '569.36',
          percentage: '-0.3',
          currencySymbol: '£',
        },
        usd: {
          value: '-131.98',
          percentage: '0.0',
          currencySymbol: '$',
        },
        usdt: {
          value: '2196.201179',
          percentage: '-0.8',
          currencySymbol: 'USDT',
        },
        btc: {
          value: '0.01509351',
          percentage: '-0.2',
          currencySymbol: 'BTC',
        },
      },
      availableBalanceDetails: {
        totalEur: '-252251.41',
        eur: {
          value: '-255013.76',
          percentage: '101.1',
          currencySymbol: '€',
        },
        gbp: {
          value: '569.36',
          percentage: '-0.3',
          currencySymbol: '£',
        },
        usd: {
          value: '-131.98',
          percentage: '0.0',
          currencySymbol: '$',
        },
        usdt: {
          value: '2196.201179',
          percentage: '-0.8',
          currencySymbol: 'USDT',
        },
        btc: {
          value: '0.01509351',
          percentage: '-0.2',
          currencySymbol: 'BTC',
        },
      },
      batchedBalanceDetails: {
        totalEur: '-252251.41',
        eur: {
          value: '-255013.76',
          percentage: '101.1',
          currencySymbol: '€',
        },
        gbp: {
          value: '569.36',
          percentage: '-0.3',
          currencySymbol: '£',
        },
        usd: {
          value: '-131.98',
          percentage: '0.0',
          currencySymbol: '$',
        },
        usdt: {
          value: '2196.201179',
          percentage: '-0.8',
          currencySymbol: 'USDT',
        },
        btc: {
          value: '0.01509351',
          percentage: '-0.2',
          currencySymbol: 'BTC',
        },
      },
      currency: {
        id: '11',
        name: 'The Euro',
        currencyCode: 'EUR',
        symbol: '€',
      },
      totalExternalFee: '0',
    };
  }

  getMerchantsFinanceDetails(): IMerchantTransactionFinanceResponse[] {
    return [
      {
        id: 1,
        batchedBalanceDetails: {
          totalEur: '4.36',
          eur: {
            value: '310.41',
            percentage: '-7123.7',
            currencySymbol: '€',
          },
          gbp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '£',
          },
          usd: {
            value: '-110.00',
            percentage: '2405.9',
            currencySymbol: '$',
          },
          usdt: {
            value: '-220.000000',
            percentage: '4817.8',
            currencySymbol: 'USDT',
          },
          btc: {
            value: '0.00000000',
            percentage: '0.0',
            currencySymbol: 'BTC',
          },
        },
        totalBalanceDetails: {
          totalEur: '9.11',
          eur: {
            value: '310.41',
            percentage: '-7123.7',
            currencySymbol: '€',
          },
          gbp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '£',
          },
          usd: {
            value: '-110.00',
            percentage: '2405.9',
            currencySymbol: '$',
          },
          usdt: {
            value: '-220.000000',
            percentage: '4817.8',
            currencySymbol: 'USDT',
          },
          btc: {
            value: '0.00000000',
            percentage: '0.0',
            currencySymbol: 'BTC',
          },
        },
        availableBalanceDetails: {
          totalEur: '6.43',
          eur: {
            value: '310.41',
            percentage: '-7123.7',
            currencySymbol: '€',
          },
          gbp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '£',
          },
          usd: {
            value: '-110.00',
            percentage: '2405.9',
            currencySymbol: '$',
          },
          usdt: {
            value: '-220.000000',
            percentage: '4817.8',
            currencySymbol: 'USDT',
          },
          btc: {
            value: '0.00000000',
            percentage: '0.0',
            currencySymbol: 'BTC',
          },
        },
        refundVolume: {
          totalEur: '0.00',
          azn: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '₼',
          },
          bdt: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '৳',
          },
          brl: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'R$',
          },
          cad: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'C$',
          },
          clp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '$',
          },
          eur: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '€',
          },
          gbp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '£',
          },
          jpy: {
            value: '0',
            percentage: '0.0',
            currencySymbol: '¥',
          },
          krw: {
            value: '0',
            percentage: '0.0',
            currencySymbol: '₩',
          },
          nok: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'kr',
          },
          nzd: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'NZ$',
          },
          pen: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'S/',
          },
          thb: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '฿',
          },
          usd: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '$',
          },
        },
        depositVolume: {
          totalEur: '18.48',
          azn: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '₼',
          },
          bdt: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '৳',
          },
          brl: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'R$',
          },
          cad: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'C$',
          },
          clp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '$',
          },
          eur: {
            value: '18.48',
            percentage: '100.0',
            currencySymbol: '€',
          },
          gbp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '£',
          },
          jpy: {
            value: '0',
            percentage: '0.0',
            currencySymbol: '¥',
          },
          krw: {
            value: '0',
            percentage: '0.0',
            currencySymbol: '₩',
          },
          nok: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'kr',
          },
          nzd: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'NZ$',
          },
          pen: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'S/',
          },
          thb: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '฿',
          },
          usd: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '$',
          },
        },
        withdrawalVolume: {
          totalEur: '6.50',
          azn: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '₼',
          },
          bdt: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '৳',
          },
          brl: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'R$',
          },
          cad: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'C$',
          },
          clp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '$',
          },
          eur: {
            value: '6.50',
            percentage: '100.0',
            currencySymbol: '€',
          },
          gbp: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '£',
          },
          jpy: {
            value: '0',
            percentage: '0.0',
            currencySymbol: '¥',
          },
          krw: {
            value: '0',
            percentage: '0.0',
            currencySymbol: '₩',
          },
          nok: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'kr',
          },
          nzd: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'NZ$',
          },
          pen: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: 'S/',
          },
          thb: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '฿',
          },
          usd: {
            value: '0.00',
            percentage: '0.0',
            currencySymbol: '$',
          },
        },
        numberOfTransactions: 3,
        name: 'the merchant',
        currency: {
          id: 11,
          name: 'The Euro',
          currencyCode: 'EUR',
          symbol: '€',
        },
      },
    ];
  }

  getByFilter(data) {
    return createTransaction(data);
  }

  getMerchantsStatistics() {
    return {
      usd: {
        value: randomInt(),
        percentage: randomInt(),
        currencySymbol: '$',
      },
      eur: {
        value: randomInt(),
        percentage: randomInt(),
      },
      gbp: {
        value: randomInt(),
        percentage: randomInt(),
        currencySymbol: '£',
      },
      totalEur: `${randomInt()}`,
    };
  }

  getMerchantUsersStatistics() {
    return {
      usd: {
        value: randomInt(),
        percentage: randomInt(),
        currencySymbol: '$',
      },
      eur: {
        value: randomInt(),
        percentage: randomInt(),
      },
      gbp: {
        value: randomInt(),
        percentage: randomInt(),
        currencySymbol: '£',
      },
      totalEur: `${randomInt()}`,
    };
  }

  getDepositWallet(data) {
    return {
      walletAddress: 'WALLET_ADDRESS',
      tag: 'TAG',
      transaction: this.transactions.find((transaction) => transaction.look_up_id === data.transactionId),
    };
  }
}

export const externalcryptowallet = {
  create(data) {
    return {
      id: randomInt(),
      wallet_address: 'WALLET_ADDRESS',
      currency_code: 'BTC',
      user_id: randomInt(),
      aml: [],
      created_at: new Date(),
      updated_at: new Date(),
      ...data,
    };
  },
  get() {
    return [
      {
        id: randomInt(),
        wallet_address: 'WALLET_ADDRESS',
        currency_code: 'BTC',
        user_id: randomInt(),
        aml: [],
        userType: 'MERCHANT_USER',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
  },
};

export const transactionbatch = {
  create() {
    return createTransactionBatch();
  },
  get() {
    return createTransactionBatch();
  },
  getAll() {
    return {
      count: randomInt(),
      rows: [createTransactionBatch()],
    };
  },
  update() {
    /* empty */
  },
  delete() {
    return randomInt();
  },
  queueDraftBatchTask() {
    /* empty */
  },
  payout(data) {
    return createTransactionBatch(data);
  },
};

export const currency = {
  create(data) {
    return createCurrency(data);
  },
  getOne(data) {
    return createCurrency(data);
  },
  getAll(data) {
    return { rows: [createCurrency(data)], count: 1 };
  },
  update(data) {
    return createCurrency(data);
  },
  delete() {
    return 'Currency has been deleted';
  },
};

export const systemSettings = {
  get(key) {
    return cache.settings[key];
  },
  getAll() {
    return Object.keys(cache.settings).map((k) => {
      return {
        [k]: cache.settings[k],
        id: faker.number.int(),
      };
    });
  },
  refreshAll({ data }) {
    data.forEach((s) => {
      cache.settings[s.key] = s.value;
    });
  },
  upsert(data) {
    cache.settings[data.key] = data.value;
    return data;
  },
  clearCache() {
    cache.settings = {};
  },
};
