import { type SendMessageOptions } from 'node-telegram-bot-api';
import BotClient from '../../bot';
import { interfaces } from '../../interface';

export class UserService implements interfaces.UserService {
  async sendWelcomeMessage(chatId: number): Promise<void> {
    const welcomeMessage = `
            Welcome to the bot! Here are some commands you can use:
            /help - Show help message
            /start - Start the bot
        `;

    const options: SendMessageOptions = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '/help', callback_data: 'help' },
            { text: '/start', callback_data: 'start' },
          ],
        ],
      },
    };

    await BotClient.sendMessage(chatId, welcomeMessage, options);
  }
}
