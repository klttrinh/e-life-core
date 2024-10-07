/* eslint-disable import/no-import-module-exports */
import { DynamicModule, ForwardReference, INestApplication, ModuleMetadata, Type } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import supertest from 'supertest';
import { TestUtils } from '../utils/test.utility';

// eslint-disable-next-line import/no-mutable-exports
export let module: TestingModule;

// eslint-disable-next-line import/no-mutable-exports
export let app: INestApplication;

export async function destroyUnitTestModule() {
  if (module == null) return;

  if (app != null) {
    await app.close();

    app = null;
  } else {
    await module.close();
  }

  module = null;
}

export async function createUnitTestModule(
  appModule?: Type | DynamicModule | Promise<DynamicModule> | ForwardReference,
  metadata: ModuleMetadata = {},
) {
  await destroyUnitTestModule();

  const { imports = [], ...rest } = metadata;

  if (appModule != null) {
    imports.push(appModule);
  }

  module = await TestUtils.createUnitTestModule({
    imports,
    ...rest,
    db: true,
    cache: true,
    client: true,
    settings: true,
  });

  return module;
}

export async function createE2ETestModule(
  appModule?: Type | DynamicModule | Promise<DynamicModule> | ForwardReference,
  metadata: ModuleMetadata = {},
) {
  await createUnitTestModule(appModule, metadata);

  app = module.createNestApplication();

  app.enableShutdownHooks();

  return app.init();
}

export function http() {
  return supertest(app.getHttpServer());
}
