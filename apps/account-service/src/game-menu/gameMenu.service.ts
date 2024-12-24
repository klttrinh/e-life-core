import { Injectable } from '@nestjs/common';
import { Action, ActionNest } from '../decorator/index';

@Injectable()
export class GameMenuService {
  constructor() {}

  @Action({ name: 'Send message', description: 'Send a message to your friend' })
  public sendMessage(
    friendName: string,
    @ActionNest({ name: 'Test action', description: 'This is a test action' }) actionDetails: any,
  ) {
    console.log('actionDetails', actionDetails);
    console.log(`Sending message to ${friendName}`);
  }

  @Action({ name: 'Play game', description: 'Play a game with your friend' })
  public playGame(friendName: string) {
    console.log(`Playing a game with ${friendName}`);
  }

  @Action({ name: 'Call', description: 'Call your friend' })
  public callFriend(friendName: string) {
    console.log(`Calling ${friendName}`);
  }

  // Method to execute an action based on the action name
  chooseAction(actionName: string, friendName: string) {
    const actions: string[] = Object.getOwnPropertyNames(GameMenuService.prototype);
    for (const action of actions) {
      const actionDetails = (this as any)[action]?.actionDetails;
      if (actionDetails && actionDetails.name === actionName) {
        console.log(`You chose to: ${actionName}`);
        (this as any)[action](friendName);
      }
    }
  }
}
