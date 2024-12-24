import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameMenuService } from './game-menu/gameMenu.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GameMenuService],
})
export class AppModule {}
