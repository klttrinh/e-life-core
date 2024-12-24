import { Injectable } from '@nestjs/common';
import { GameMenuService } from './game-menu';

@Injectable()
export class AppService {
  constructor(private gameMenuService: GameMenuService) {}

  getHello(): string {
    this.gameMenuService.chooseAction('Send message', 'John Doe');
    return 'Hello notification service!';
  }
}
