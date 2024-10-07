/* eslint-disable max-len */
import 'dotenv/config';
import { ServicesEnum } from './service.type.enum';

const ENDPOINTS: { [key in ServicesEnum]: string } = {
  [ServicesEnum.AUTH_SERVICE]: process.env.AUTH_SERVICE_URL || 'localhost:3000',
  [ServicesEnum.COMMUNICATION_SERVICE]: process.env.COMMUNICATION_SERVICE_URL || 'localhost:3001',
  [ServicesEnum.ME_SERVICE]: process.env.ME_SERVICE_URL || 'localhost:3002',
  [ServicesEnum.MESSAGE_SERVICE]: process.env.MESSAGE_SERVICE_URL || 'localhost:3003',
  [ServicesEnum.NOTIFICATION_SERVICE]: process.env.NOTIFICATION_SERVICE_URL || 'localhost:3004',
  [ServicesEnum.PAYMENT_SERVICE]: process.env.PAYMENT_SERVICE_URL || 'localhost:3005',
  [ServicesEnum.PROPERTY_SERVICE]: process.env.PROPERTY_SERVICE_URL || 'localhost:3006',
  [ServicesEnum.REVIEW_RATING_SERVICE]: process.env.REVIEW_RATING_SERVICE_URL || 'localhost:3007',
  [ServicesEnum.WHITELABEL_API]: process.env.WHITELABEL_API_URL || 'localhost:30011',
};

export const InternalEventsEnum = {
  [ServicesEnum.AUTH_SERVICE]: {},
  [ServicesEnum.COMMUNICATION_SERVICE]: {},
  [ServicesEnum.ME_SERVICE]: {},
  [ServicesEnum.MESSAGE_SERVICE]: {},
  [ServicesEnum.WHITELABEL_API]: {},
  [ServicesEnum.NOTIFICATION_SERVICE]: {},
  [ServicesEnum.PAYMENT_SERVICE]: {},
  [ServicesEnum.PROPERTY_SERVICE]: {},
  [ServicesEnum.REVIEW_RATING_SERVICE]: {},
};

Object.values(InternalEventsEnum).forEach((service) => {
  const testArr: unknown[] = [];
  Object.values(service).forEach((category: any) => {
    Object.values(category).forEach((path) => {
      if (testArr.includes(path)) {
        throw new Error(`Duplicate value for path ${path} in InternalEventsEnum`);
      }
      testArr.push(path);
    });
  });
});
