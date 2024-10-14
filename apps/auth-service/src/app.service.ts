import { Injectable } from '@nestjs/common';
// import { main } from '@e-life/chat-gpt';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    // await main();
    return 'Hello chat-gpt!';
  }
}
