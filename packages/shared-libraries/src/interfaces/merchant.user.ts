import { IMerchant } from './merchant';

export interface IMerchantUser {
  id: number;

  externalId: string;

  merchantId: number;

  firstName: string;

  lastName: string;

  dateOfBirth: Date | string;

  country: string;

  status: string;

  userLevelId: number;

  phone?: string;

  phoneCode?: string;

  city?: string;

  email?: string;

  merchant: IMerchant;

  name: string;

  state: string;

  zipCode: string;

  address: string;

  addressTwo: string;

  addressNumber: string;

  internalUser: string;

  createdAt: Date;

  updatedAt: Date;
}
