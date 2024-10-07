import Redlock from 'redlock';

type LockType = {
  type:
    | 'transaction'
    | 'webhook'
    | 'create-user'
    | 'email-token'
    | 'referral-code'
    | 'credit-order'
    | 'withdraw'
    | 'asset'
    | 'batch-transactions'
    | 'merchant-balance-withdrawal'
    | 'batch-balance-transaction';
  tag: string;
};

export function LockDecorator(
  lockTags: LockType | LockType[] | ((...args) => LockType | LockType[]), // last one is always context
  options?: { settings?: Redlock['settings']; duration?: number },
): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const { value } = descriptor;
    descriptor.value = async function (...args) {
      const origin = typeof lockTags === 'function' ? lockTags(...args, this) : lockTags;
      const locks = Array.isArray(origin) ? origin.map((t) => `${t.type}-${t.tag}`) : `${origin.type}-${origin.tag}`;
      return global.lockService.auto(locks, async () => value.call(this, ...args), options);
    };

    return descriptor;
  };
}

export const UseLock = LockDecorator;
