import { module } from '../../jest';
import { SystemSettingService } from './system.setting.service';
import { CacheService } from '../../cache';
import { ProductEnum } from '../../models/product';
import { SystemSettingsEnum } from './enums/system.settings.enum';
import { SystemSettingValueTypeEnum } from './enums/system.setting.value.type.enum';
import { SystemSetting as SystemSettingModel } from './models/system-setting.model';
import { DefaultClientService } from '../default-client';
import { CurrencyTypeEnum } from '../../models/currency';
import { ServicesEnum } from '../../general';
import { InitiatorTypeEnum } from '../../models/transaction';

describe('SystemSettingService', () => {
  let systemSettingService: SystemSettingService;
  let cacheService: CacheService;

  beforeAll(async () => {
    systemSettingService = module.get<SystemSettingService>(SystemSettingService);
    cacheService = module.get<CacheService>(CacheService);
  });

  describe('getSystemSetting', () => {
    it('should return value when it exists in cache', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const cacheKey = systemSettingService.createCacheKey(
        SystemSettingsEnum.ADMIN_DASHBOARD_URL,
        ProductEnum.PAYMENT_GATEWAY,
      );

      await cacheService.set(cacheKey, 'val');

      await expect(
        systemSettingService.getSystemSetting(SystemSettingsEnum.ADMIN_DASHBOARD_URL, {
          product: ProductEnum.PAYMENT_GATEWAY,
        }),
      ).resolves.toEqual('val');
    });

    it('should return value from db when it does not exist in cache', async () => {
      jest.spyOn(DefaultClientService.prototype, 'request').mockImplementation(async () => {
        //
      });

      await SystemSettingModel.create({
        key: 'key1',
        value: 'val1',
        type: SystemSettingValueTypeEnum.String,
        visible: true,
      });

      await expect(systemSettingService.getSystemSetting('key1' as SystemSettingsEnum)).resolves.toEqual('val1');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const cacheKey = systemSettingService.createCacheKey('key1' as SystemSettingsEnum);
      await expect(cacheService.get(cacheKey)).resolves.toEqual('val1');
    });

    it('should call fetchSystemSettingsFromProduct to get setting from other services', async () => {
      const mockedFetchSystemSettingsFromProduct = jest
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .spyOn(SystemSettingService.prototype, 'fetchSystemSettingsFromProduct')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockImplementation(() => {
          //
        });

      await systemSettingService
        .getSystemSetting('key2' as SystemSettingsEnum, { product: ProductEnum.PAYMENT_GATEWAY })
        .catch((e) => {
          //
        });

      expect(mockedFetchSystemSettingsFromProduct).toHaveBeenCalledWith(ProductEnum.PAYMENT_GATEWAY);
    });
  });

  it('should cache keys from other services', async () => {
    jest.spyOn(DefaultClientService.prototype, 'request').mockImplementation(async () =>
      Promise.resolve([
        { key: 'key1', value: 'val1' },
        { key: 'key2', value: 'val2' },
      ]),
    );

    await systemSettingService.getSystemSetting('key1' as SystemSettingsEnum, { product: ProductEnum.PAYMENT_GATEWAY });

    await expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cacheService.get(systemSettingService.createCacheKey('key1' as SystemSettingsEnum, ProductEnum.PAYMENT_GATEWAY)),
    ).resolves.toEqual('val1');
    await expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cacheService.get(systemSettingService.createCacheKey('key2' as SystemSettingsEnum, ProductEnum.PAYMENT_GATEWAY)),
    ).resolves.toEqual('val2');
  });

  describe('shouldShowOnOffRamp', () => {
    it('should show on-off-ramp button', async () => {
      jest
        .spyOn(systemSettingService, 'getOnOffRampMinimumAllowedAmount')
        .mockImplementation(() => Promise.resolve('0'));
      jest.spyOn(systemSettingService, 'getOnOffRampAllowedCurrencies').mockImplementation(() => Promise.resolve([1]));

      await expect(
        systemSettingService.shouldShowOnOffRamp(
          { onOffRampEnabled: true },
          {
            onrEnabled: true,
            amountTo: 100,
            fromCurrencyType: CurrencyTypeEnum.FIAT,
            fromCurrencyId: 1,
            toCurrencyId: 0,
          },
          ServicesEnum.PAYMENT_GATEWAY_API,
        ),
      ).resolves.toMatchObject({ showOnOffRamp: true, reason: '' });
    });

    it('should not show on-off-ramp button if currency is not allowed by merchant', async () => {
      jest
        .spyOn(systemSettingService, 'getOnOffRampMinimumAllowedAmount')
        .mockImplementation(() => Promise.resolve('0'));
      jest.spyOn(systemSettingService, 'getOnOffRampAllowedCurrencies').mockImplementation(() => Promise.resolve([1]));

      await expect(
        systemSettingService.shouldShowOnOffRamp(
          { onOffRampEnabled: true },
          {
            onrEnabled: true,
            amountTo: 100,
            fromCurrencyType: CurrencyTypeEnum.FIAT,
            fromCurrencyId: 2,
            toCurrencyId: 0,
          },
          ServicesEnum.PAYMENT_GATEWAY_API,
        ),
      ).resolves.toMatchObject({ showOnOffRamp: false, reason: 'Currency is not allowed by on-off ramp' });
    });
  });

  describe('update', () => {
    it('should call listeners after updating a value', async () => {
      jest.spyOn(DefaultClientService.prototype, 'request').mockImplementation(async () => {
        //
      });

      const setting = await SystemSettingModel.create({
        key: SystemSettingsEnum.TEST,
        value: 'val1',
        type: SystemSettingValueTypeEnum.String,
        editable: true,
      });

      const mockedListener = jest.fn();
      systemSettingService.on('update', mockedListener);

      await systemSettingService.update({
        setting: { key: setting.key as SystemSettingsEnum, value: 'val2' },
        initiator: { id: 1, name: 'admin', type: InitiatorTypeEnum.MERCHANT },
      });

      expect(mockedListener).toHaveBeenCalledTimes(1);
    });

    it('should check value based on setting type on update', async () => {
      const initiator = { id: 1, name: 'admin', type: InitiatorTypeEnum.MERCHANT };
      jest.spyOn(DefaultClientService.prototype, 'request').mockImplementation(async () => {
        //
      });

      await SystemSettingModel.destroy({ where: { key: SystemSettingsEnum.TEST } });
      const setting = await SystemSettingModel.create({
        key: SystemSettingsEnum.TEST,
        value: JSON.stringify([]),
        type: SystemSettingValueTypeEnum.EnumArray,
        editable: true,
        enum: ['option1', 'option2'],
      });

      // EnumArray
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: JSON.stringify(['option3']) },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: JSON.stringify(['option1']) },
          initiator,
        }),
      ).resolves.toBeUndefined();

      // StringArray
      await setting.update({ type: SystemSettingValueTypeEnum.StringArray });
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'something' },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: JSON.stringify(['something']) },
          initiator,
        }),
      ).resolves.toBeUndefined();

      // Boolean
      await setting.update({ type: SystemSettingValueTypeEnum.Boolean });
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'something' },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'false' },
          initiator,
        }),
      ).resolves.toBeUndefined();

      // Object
      await setting.update({ type: SystemSettingValueTypeEnum.Object });
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'something' },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: JSON.stringify({ a: 'b' }) },
          initiator,
        }),
      ).resolves.toBeUndefined();

      // HTML
      await setting.update({ type: SystemSettingValueTypeEnum.HTML });
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'something' },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: '<html></html>' },
          initiator,
        }),
      ).resolves.toBeUndefined();

      // Integer
      await setting.update({ type: SystemSettingValueTypeEnum.Integer });
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'something' },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: '1' },
          initiator,
        }),
      ).resolves.toBeUndefined();

      // IntegerArray
      await setting.update({ type: SystemSettingValueTypeEnum.IntegerArray });
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: 'something' },
          initiator,
        }),
      ).rejects.toThrow(`system setting's data type does not match`);
      await expect(
        systemSettingService.update({
          setting: { key: setting.key as SystemSettingsEnum, value: JSON.stringify([1, 2]) },
          initiator,
        }),
      ).resolves.toBeUndefined();
    });
  });
});
