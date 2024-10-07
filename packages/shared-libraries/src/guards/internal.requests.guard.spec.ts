import { ConfigService } from '@nestjs/config';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { InternalRequestsGuard } from './internal.requests.guard';

describe('InternalRequestsGuard', () => {
  let guard: InternalRequestsGuard;
  beforeAll(() => {
    guard = new InternalRequestsGuard(new ConfigService<Record<string, unknown>, false>(), []);
  });
  it('should return true for externals', async () => {
    await expect(
      guard.canActivate(
        createMock<ExecutionContext>({
          switchToHttp: () => ({
            getRequest: () => ({
              path: '/v1/',
              headers: {
                'x-client-ip': '78.47.147.188',
              },
            }),
          }),
        }),
      ),
    ).resolves.toEqual(true);
  });

  it('should return false for internals', async () => {
    await expect(
      guard.canActivate(
        createMock<ExecutionContext>({
          switchToHttp: () => ({
            getRequest: () => ({
              path: '/internal/',
              headers: {
                'x-client-ip': '78.47.147.188',
              },
            }),
          }),
        }),
      ),
    ).resolves.toEqual(false);
  });

  it('should return true for internal request but internal ips', async () => {
    await expect(
      guard.canActivate(
        createMock<ExecutionContext>({
          switchToHttp: () => ({
            getRequest: () => ({
              path: '/internal/',
              headers: {
                'x-client-ip': '10.0.0.2',
              },
            }),
          }),
        }),
      ),
    ).resolves.toEqual(true);
  });
});
