import { ServiceFacade } from './client'

class TelegramClient {
    private static instance: TelegramClient;
    private client: ServiceFacade;

    private constructor() {
        this.client = new ServiceFacade();
    }

    public static getInstance(): TelegramClient {
        if (!TelegramClient.instance) {
            TelegramClient.instance = new TelegramClient();
        }
        return TelegramClient.instance;
    }

    public getClient(): ServiceFacade {
        return this.client;
    }
}

export default TelegramClient.getInstance().getClient();
