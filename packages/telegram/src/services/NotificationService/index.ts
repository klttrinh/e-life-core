import { interfaces } from '../../interface';
import BotClient from '../../bot';
// import backendModels from '@connect/backend-models';
// const {
//     user: userModel,
//     group: groupModel,
// } = backendModels;

export class NotificationService implements interfaces.NotificationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public async sendPrivateNotification(userId: any, message: any): Promise<void> {
    await BotClient.sendMessage(userId, message);
  }

  public async sendGroupNotification(groupId: number, message: string): Promise<void> {
    await BotClient.sendMessage(groupId, message);
  }

  public async notifyAllUsers(message: string): Promise<void> {
    const users: any = [];
    // await userModel.findAll({
    //     attributes: ['id', 'chatId'],
    //     raw: true,
    // });

    for (const user of users) {
      await this.sendPrivateNotification(user.chatId, message);
    }
  }

  public async notifyAllGroups(message: string): Promise<void> {
    const groups: any = [];
    // await groupModel.findAll({
    //     attributes: ['id', 'chatId'],
    //     raw: true,
    // });
    for (const group of groups) {
      await this.sendGroupNotification(group.chatId, message);
    }
  }
}
