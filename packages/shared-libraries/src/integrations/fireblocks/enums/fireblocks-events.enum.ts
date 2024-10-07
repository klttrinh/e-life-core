/* eslint-disable max-len */
export enum FireblocksEventsEnum {
  TRANSACTION_CREATED = 'TRANSACTION_CREATED', //	Sent upon any new transaction identified in the workspace
  TRANSACTION_STATUS_UPDATED = 'TRANSACTION_STATUS_UPDATED', //	Sent upon any change in the status of a transaction or number of confirmations update
  TRANSACTION_APPROVAL_STATUS_UPDATED = 'TRANSACTION_APPROVAL_STATUS_UPDATED', //	Sent with every approval based on the Transaction Authorization Policy
  VAULT_ACCOUNT_ADDED = 'VAULT_ACCOUNT_ADDED', //	Sent upon addition of a new vault account in the workspace
  VAULT_ACCOUNT_ASSET_ADDED = 'VAULT_ACCOUNT_ASSET_ADDED', //	Sent upon addition of a new asset under a vault account
  INTERNAL_WALLET_ASSET_ADDED = 'INTERNAL_WALLET_ASSET_ADDED', //	Sent upon addition of a new asset under an internal wallet
  EXTERNAL_WALLET_ASSET_ADDED = 'EXTERNAL_WALLET_ASSET_ADDED', //	Sent upon addition of a new asset under an external wallet
  EXCHANGE_ACCOUNT_ADDED = 'EXCHANGE_ACCOUNT_ADDED', //	Sent upon addition of a new exchange account
  FIAT_ACCOUNT_ADDED = 'FIAT_ACCOUNT_ADDED', //	Sent upon addition of a new fiat account
  NETWORK_CONNECTION_ADDED = 'NETWORK_CONNECTION_ADDED', // Sent upon addition of a new network connection
}
