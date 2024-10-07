import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';
import { SequelizeModule } from '@nestjs/sequelize';
import request from 'supertest';
import { INestApplication, VersioningType } from '@nestjs/common';
import { CacheModule } from '../cache';
import { getSequelizeConfig } from '../sequelize';
import { DefaultClientModule, SystemSettingModule } from '../modules';
import { LockModule } from '../modules/locks';

let adminJWT;
// jest.setTimeout(120000);

export class TestUtils {
  public static getCookie(res: any, name: string): string | undefined {
    return res.headers['set-cookie'][0]
      .split(',')
      .map((i: string) => i.split(';')[0])
      .find((c: string) => c.startsWith(`${name}=`))
      ?.split(`${name}=`)[1];
  }

  public static async sleep(duration: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }

  public static async adminJWT(AppModule): Promise<string> {
    if (!adminJWT) {
      const app = await TestUtils.createE2ETestModule({ imports: [AppModule], db: true });
      const res = await request(app.getHttpServer())
        .post('/admin/login')
        .send({
          email: 'admin@xcoins.com',
          password: 'Password1@',
        })
        .expect(200);
      adminJWT = `Bearer ${res.body.accessToken}`;
    }
    return adminJWT;
  }

  public static createUnitTestModule(
    metadata: ModuleMetadata & { db?: boolean; client?: boolean; cache?: boolean; settings?: boolean } = {},
  ): Promise<TestingModule> {
    const {
      imports = [],
      providers = [],
      controllers = [],
      exports = [],
      db = false,
      client = false,
      cache = false,
      settings = false,
    } = metadata;

    if (client) {
      imports.push(DefaultClientModule.register());
    }

    if (cache) {
      imports.push(CacheModule.register(), LockModule.register());
    }

    if (db) {
      imports.push(
        SequelizeModule.forRootAsync({
          imports: [ConfigModule.forFeature(getSequelizeConfig('database'))],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return configService.get('database');
          },
        }),
      );
    }

    if (settings) {
      imports.push(SystemSettingModule.register());
    }

    imports.unshift(
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env',
      }),
    );

    return Test.createTestingModule({ imports, providers, controllers, exports }).compile();
  }

  public static async createE2ETestModule(
    metadata: ModuleMetadata & {
      db?: boolean;
      client?: boolean;
      cache?: boolean;
      settings?: boolean;
      enableVersioning?: boolean;
    } = {},
  ): Promise<INestApplication> {
    const moduleFixture = await this.createUnitTestModule(metadata);

    const app = moduleFixture.createNestApplication();

    if (metadata.enableVersioning) {
      app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
      });
    }

    return app.init();
  }
}
