/* eslint-disable max-len */
export enum EllipticStatusEnum {
  COMPLETED = 'COMPLETED', // The screening has been completed successfully. This means a successful result has arrived or the six-hour timeout limit has been reached.
  PENDING = 'PENDING', // The screening is still in progress. Transactions remain in this status for six hours after being registered with the transaction monitoring provider.
  FAILED = 'FAILED', // The transaction failed the screening process. This status only appears when you turn off the Bypass on Failure flag; otherwise, these transactions are bypassed.
  BYPASSED = 'BYPASSED', // The screening did not occur and the transaction was automatically accepted due to one of the following reasons:
  //     Policy: The Transaction Screening Policy allows the transaction to bypass screening.
  //     Unsupported Asset: The transaction was bypassed due to the transaction using assets unsupported by the AML provider. This includes SEN/Signet.
  //     Unsupported Route: Some routes are not supported for screening. For more information, refer to the Transaction Screening and Monitoring | AML article.
  //     Bypassed Failure: By default, transactions with a screening failure are bypassed. If you want to freeze transactions when a screening failure occurs, you must turn off the Bypass on Failure flag. Additionally, this may indicate your API key has expired.
  //     Manual: This indicates a user manually bypassed a transaction's rejection using the console or the AP
}
