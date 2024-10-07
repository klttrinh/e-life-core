import { InitiatorTypeEnum } from '../models';

export interface IAML {
  id: number;
  provider: InitiatorTypeEnum;
  rule_name: string;
  risk_score: number;
  details: string | object;
  transaction_id: number;
  crypto_wallet_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICryptoWallet {
  id: number;
  wallet_address: string;
  currency_id: number;
  user_id: number;
  aml: IAML[];
  is_alerted: boolean;
  created_at: Date;
  updated_at: Date;
}
