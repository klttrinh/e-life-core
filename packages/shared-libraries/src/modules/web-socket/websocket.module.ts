import { DynamicModule, Global, Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class WebsocketModule {
  static register(): DynamicModule {
    return {
      global: true,
      imports: [],
      module: WebsocketModule,
      providers: [WebsocketService],
      exports: [WebsocketService],
    };
  }
}
