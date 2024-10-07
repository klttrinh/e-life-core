export enum StatusReasonEnum { // based on Front-end needs, key and value in this enum should be the same,
  FAILED_ORDER_CREATION = 'FAILED_ORDER_CREATION',
  FAILED_FROM_PROVIDER = 'FAILED_FROM_PROVIDER',
  DROPPED_BY_BLOCKCHAIN = 'DROPPED_BY_BLOCKCHAIN', // we set the replace_transaction_id field in transaction
  REJECTED_BY_ELLIPTIC = 'REJECTED_BY_ELLIPTIC',
  REJECTED_BY_INTERNAL_AML = 'REJECTED_BY_INTERNAL_AML',
  UPDATED_BY_ADMIN = 'UPDATED_BY_ADMIN',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS', // withdrawals
  DOCUMENTS_NOT_SIGNED = 'DOCUMENTS_NOT_SIGNED',
  REQUESTED_DOCUMENT_NOT_PROVIDED = 'REQUESTED_DOCUMENT_NOT_PROVIDED',
  INTERNAL = 'INTERNAL',
}
