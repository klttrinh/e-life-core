import { UserService } from './userService';
import { NotificationService } from './NotificationService';

export class ServiceFacade {
  private userService: UserService;

  private notificationService: NotificationService;

  constructor() {
    this.userService = new UserService();
    this.notificationService = new NotificationService();
  }

  async sendWelcomeMessage(chatId: number): Promise<void> {
    return this.userService.sendWelcomeMessage(chatId);
  }

  async sendPrivateNotification(userId: number, message: string): Promise<void> {
    return this.notificationService.sendPrivateNotification(userId, message);
  }

  async sendGroupNotification(groupId: number, message: string): Promise<void> {
    return this.notificationService.sendGroupNotification(groupId, message);
  }

  async notifyAllUsers(message: string): Promise<void> {
    return this.notificationService.notifyAllUsers(message);
  }

  async notifyAllGroups(message: string): Promise<void> {
    return this.notificationService.notifyAllGroups(message);
  }
}
