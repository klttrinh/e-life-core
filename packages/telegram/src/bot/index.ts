import TelegramBot from 'node-telegram-bot-api';

const token = '7465809572:AAH0pxxGNVMNRyOpzjWFvZxUoNooR4nODQI';
class BotClient {
  // eslint-disable-next-line no-use-before-define
  private static instance: BotClient;

  private client: TelegramBot;

  private constructor() {
    console.log('Bot is running...');

    this.client = new TelegramBot(token, { polling: true });
  }

  public static getInstance(): BotClient {
    if (!BotClient.instance) {
      BotClient.instance = new BotClient();
    }
    return BotClient.instance;
  }

  public getClient(): TelegramBot {
    console.log('Bot is running...');
    return this.client;
  }
}

export default BotClient.getInstance().getClient();
