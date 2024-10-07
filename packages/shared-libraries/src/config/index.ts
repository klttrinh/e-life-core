import { ServicesEnum } from '../general/enums/service.type.enum';

const HashConfig = {
  HASH_ITERATION: process.env.HASH_ITERATION,
  HASH_KEY_LENGTH: process.env.HASH_KEY_LENGTH,
  HASH_ALGORITHM: process.env.HASH_ALGORITHM,
};

export default HashConfig;

export const globalSettings: { serviceType: ServicesEnum } = {} as any;
