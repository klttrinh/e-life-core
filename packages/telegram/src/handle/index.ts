import TelegramBot from 'node-telegram-bot-api';
import TelegramClient from '../services';

const start = async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    await TelegramClient.sendWelcomeMessage(chatId);
};


const help = async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    await TelegramClient.sendWelcomeMessage(chatId);
};


export const handle = {
    start,
    help,
};