import { Model, ModelStatic } from 'sequelize';
import { SystemSetting } from '../../modules/system-setting/models/system-setting.model';

const REGISTERED_MODELS = new Set<ModelStatic<Model>>();

const LISTENED_MODELS = new Set<ModelStatic<Model>>();

const MODIFIED_MODELS = new Set<ModelStatic<Model>>();

export function watch(model: ModelStatic<Model>): void {
  if (model === SystemSetting) return;

  if (REGISTERED_MODELS.has(model)) return;

  REGISTERED_MODELS.add(model);
}

// Hooks are not working sometimes, so we reset all tables regardless of being modified or not
export function listen(): void {
  // eslint-disable-next-line no-restricted-syntax
  for (const model of REGISTERED_MODELS) {
    if (LISTENED_MODELS.has(model)) continue;

    const hook = () => {
      MODIFIED_MODELS.add(model);
    };

    try {
      model.beforeCreate(hook);
      model.beforeUpdate(hook);
      model.beforeSave(hook);
      model.beforeBulkCreate(hook);
      model.beforeBulkUpdate(hook);

      LISTENED_MODELS.add(model);
    } catch (error) {
      /* empty */
    }
  }
}

export async function reset(): Promise<number[]> {
  // if (MODIFIED_MODELS.size === 0) return [];

  return Promise.all(
    [...REGISTERED_MODELS].map((model) =>
      model.destroy({
        where: {},
        force: true,
        truncate: true,
        cascade: true,
        restartIdentity: true,
      }),
    ),
  );
}
