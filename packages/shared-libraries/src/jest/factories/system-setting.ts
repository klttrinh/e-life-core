import { faker } from '@faker-js/faker';
import { CreationAttributes } from 'sequelize';
import { watch } from './models.jest';
import { SystemSetting } from '../../modules/index';

watch(SystemSetting);

export default async function systemSettingFactory(
  systemSetting: Partial<CreationAttributes<SystemSetting>> = {},
): Promise<SystemSetting> {
  return SystemSetting.create({
    key: faker.string.sample(),
    value: faker.string.sample(),
    ...systemSetting,
  });
}
