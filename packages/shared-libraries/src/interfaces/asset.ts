import { AssetStatusEnum } from '../models/assets/enums/asset-status.enum';
import { CryptoEnum } from '../models/currency/enums/crypto.enum';

export interface IAsset {
  id: number;
  currency_id: number;
  currency_code: CryptoEnum;
  status: AssetStatusEnum;
}
