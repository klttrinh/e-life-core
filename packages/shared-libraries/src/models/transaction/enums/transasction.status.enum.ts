/* eslint-disable max-len */
export enum TransactionStatusEnum {
  DRAFT = 'DRAFT', // transaction has been initiated by client
  CREATED = 'CREATED', // we have created a deposit wallet for transaction
  SUBMITTED = 'SUBMITTED', // user sent the tokens to blockchain
  ACCEPTED = 'ACCEPTED', // transaction is accepted by our side
  REJECTED = 'REJECTED', // the sender's wallet was rejected by elliptic or other validation provider
  REFUND_INITIATED = 'REFUND_INITIATED', // refund requested by admin for rejected transaction and the transaction has been created on fireblocks
  REFUNDED = 'REFUNDED', // refund transaction completed on blockchain
  REFUND_FAILED = 'REFUND_FAILED', // refund transaction failed : blocked or rejected by fireblocks
  FAILED = 'FAILED', // the provider gave a status indicated that transaction was not successful
  COMPLETED = 'COMPLETED', // transaction is accepted we have created the order on nexo or oder provider for exchange
  BATCHED = 'BATCHED', // the transaction is batched
  SETTLED = 'SETTLED', // the transaction's batch is settled
  ALERTED = 'ALERTED', // The AML is activated, and total risk score is higher than threshold, so we can reject the transaction manually by support
  REPLACED = 'REPLACED', // failed transaction that related replace no_match transaction of it went to completed
  EXPIRED = 'EXPIRED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
}
