import { LockService } from './lock.service';
import { module } from '../../jest';
import { sleep } from '../../utils';

describe('LockServie', () => {
  let lockService: LockService;

  beforeAll(async () => {
    lockService = module.get<LockService>(LockService);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await lockService.client.flushall();
    jest.spyOn(LockService.prototype, 'runHealthCheck' as any).mockImplementation(async () => ({}));
  });

  it('Single arg should convert into correct tag', async () => {
    const fn = jest
      .spyOn(LockService.prototype, 'getWriteLockWithPriority' as any)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementationOnce(async () => ({ release: () => {} } as any));

    await lockService.auto('abc', async () => ({}));
    expect(fn).toBeCalledWith(['abc']);
  });

  it('Multiple args should convert into correct tags', async () => {
    const fn = jest
      .spyOn(LockService.prototype, 'getWriteLockWithPriority' as any)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementationOnce(async () => ({ release: () => {} } as any));

    await lockService.auto(['abc', 'abc2'], async () => ({}));
    expect(fn).toBeCalledWith(['abc', 'abc2']);
  });

  it('Only one function should be able to get a lock', async () => {
    const fn1 = jest.fn(async () => sleep(4000));
    const fn2 = jest.fn(async () => ({}));

    const tag = 'someservice-1';

    lockService.auto(tag, fn1);
    lockService.auto(tag, fn2);

    await sleep(1000);

    expect(fn1).toBeCalledTimes(1);
    expect(fn2).toBeCalledTimes(0);

    await sleep(4000);

    expect(fn2).toBeCalledTimes(1);
  });

  it('Locks with different tags should run simultaneously', async () => {
    const fn1 = jest.fn(async () => sleep(2000));
    const fn2 = jest.fn(async () => sleep(2000));

    lockService.auto('someservice-1', fn1);
    lockService.auto('someservice-2', fn2);

    await sleep(500);

    expect(fn1).toBeCalledTimes(1);
    expect(fn2).toBeCalledTimes(1);
    await sleep(2000);
  });

  it('Lock should auto extend', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lockService.LOCK_MAX_TTL = 3 * 1000;
    const extendLocks = jest.spyOn(LockService.prototype, 'extendLocks' as any);
    lockService.auto(
      'someservice-1',
      jest.fn(async () => sleep(3000)),
    );
    await sleep(2000);
    expect(extendLocks).toBeCalledTimes(1);
    await sleep(1000);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    lockService.LOCK_MAX_TTL = 5 * 60 * 1000;
  });
});
