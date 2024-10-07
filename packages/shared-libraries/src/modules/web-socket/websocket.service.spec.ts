import { ConfigService } from '@nestjs/config';
import { WebsocketService } from './websocket.service';
import { WebsocketEventsEnum } from './enums/websocket.events.enum';
import { releaseEnv } from '../../utils';

describe('WebsocketService', () => {
  let websocketService: WebsocketService;
  beforeAll(() => {
    websocketService = new WebsocketService(new ConfigService<Record<string, unknown>, false>());
  });

  it('getUserChannelName() should return correct value', () => {
    expect(websocketService.getUserChannelName('1')).toEqual(`private-user-channel-1-${releaseEnv()}`);
  });

  it('getTransactionChannelName() should return correct value', () => {
    expect(websocketService.getTransactionChannelName('1')).toEqual(`private-transaction-channel-1-${releaseEnv()}`);
  });

  it('sendTransactionEvent() works correctly', async () => {
    const fn = jest.spyOn(WebsocketService.prototype, 'sendEventToChannel').mockImplementation(async () => {
      return true as any;
    });
    await websocketService.sendTransactionEvent('1', WebsocketEventsEnum.NOTIFICATION, {});
    expect(fn).toBeCalledWith(
      `private-transaction-channel-1-${releaseEnv()}`,
      WebsocketEventsEnum.NOTIFICATION,
      {},
      {},
    );
  });

  it('sendEventToRoleChannel() works correctly', async () => {
    const fn = jest.spyOn(WebsocketService.prototype, 'sendEventToChannel').mockImplementation(async () => {
      return true as any;
    });
    await websocketService.sendEventToRoleChannel(1, WebsocketEventsEnum.NOTIFICATION, {});
    expect(fn).toBeCalledWith(`private-role-channel-1-all-${releaseEnv()}`, WebsocketEventsEnum.NOTIFICATION, {});
  });

  it('sendEventToUser() works correctly', async () => {
    const fn = jest.spyOn(WebsocketService.prototype, 'sendEventToChannel').mockImplementation(async () => {
      return true as any;
    });
    await websocketService.sendEventToUser('1', WebsocketEventsEnum.NOTIFICATION, {});
    expect(fn).toBeCalledWith(`private-user-channel-1-${releaseEnv()}`, WebsocketEventsEnum.NOTIFICATION, {}, {});
  });
});
