import { IMerchant } from './merchant';
import { IMerchantUser } from './merchant.user';

export interface TransactionParticipants {
  merchant: IMerchant;
  merchantUser: IMerchantUser;
}
