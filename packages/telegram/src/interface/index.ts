// eslint-disable-next-line @typescript-eslint/no-namespace
namespace interfaces {
  export type sendWelcomeMessage = (chatId: number) => Promise<void>;
  export type sendPrivateNotification = (userId: number, message: string) => Promise<void>;
  export type sendGroupNotification = (groupId: number, message: string) => Promise<void>;
  export type notifyAllUsers = (message: string) => Promise<void>;
  export type notifyAllGroups = (message: string) => Promise<void>;
  export interface UserService {
    sendWelcomeMessage: sendWelcomeMessage;
  }
  export interface NotificationService {
    sendPrivateNotification: sendPrivateNotification;
    sendGroupNotification: sendGroupNotification;
    notifyAllUsers: notifyAllUsers;
    notifyAllGroups: notifyAllGroups;
  }
  export interface IServices {
    userService: UserService;
    notificationService: NotificationService;
    sendWelcomeMessage: sendWelcomeMessage;
    sendPrivateNotification: sendPrivateNotification;
    sendGroupNotification: sendGroupNotification;
    notifyAllUsers: notifyAllUsers;
    notifyAllGroups: notifyAllGroups;
  }
}

export type { interfaces };
