import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function Action(actionDetails: { name: string; description: string }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    target[key].actionDetails = actionDetails;
    return descriptor;
  };
}

export const ActionNest = createParamDecorator(
  (actionDetails: { name: string; description: string }, ctx: ExecutionContext) => {
    return actionDetails;
  },
);
