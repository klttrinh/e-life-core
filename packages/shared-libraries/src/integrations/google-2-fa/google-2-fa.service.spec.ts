// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
it.todo('Google2FaService');

// import { ConfigModule, ConfigType } from '@nestjs/config';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Google2FaService } from './google-2-fa.service';
// import { Google2FaModule } from './google-2-fa.module';
//
// describe('Google2FaService', () => {
//   let service: Google2FaService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [
//         Google2FaModule,
//         ConfigModule.forRoot({
//           isGlobal: true,
//           envFilePath: '.env',
//         }) /*,
//         SequelizeModule.forRootAsync({
//           imports: [ConfigModule.forFeature(SerializeConfig)],
//           inject: [SerializeConfig.KEY],
//           useFactory: (config: ConfigType<typeof SerializeConfig>) => config,
//         }),*/,
//       ],
//       providers: [Google2FaService],
//     }).compile();
//
//     service = module.get(Google2FaService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
//
//   it('generateAdminSecretKey should be defined', () => {
//     expect(service.generateAdminSecretKey()).toBeDefined();
//   });
//
//   it('generateMerchantSecretKey should be defined', () => {
//     expect(service.generateMerchantSecretKey()).toBeDefined();
//   });
//
//   it('verifySecretKey should be defined', () => {
//     expect(service.verifySecretKey).toBeDefined();
//   });
//
//   it('generateSecretKey should be return key', async () => {
//     /*const key = await service.generateSecretKey({
//       userId: 1,
//       emailAddress: 'USER@XCOINS.COM',
//     });
//     expect(key).toBeGreaterThan(10);
//     expect(key).not.toBeNull();*/
//   });
// });
