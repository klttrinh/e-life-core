import { ConfigService } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';
import { BaseRepository } from './base.repository';

describe('BaseRepository', () => {
  let repository: BaseRepository<any>;
  let arr: any[];
  beforeAll(() => {
    arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
    repository = new BaseRepository<any>({
      findOne: () => arr[0],
      findAll: () => arr,
    } as any);
  });

  it('toSnakeObjectKeys() should convert correctly', () => {
    expect(
      BaseRepository.toSnakeObjectKeys({
        a: {
          b: 1,
        },
        C: {
          B: {
            B: 1,
          },
        },
        d_d: {
          a: 1,
        },
        FF: {
          a: 1,
        },
      }),
    ).toEqual({
      a: {
        b: 1,
      },
      c: {
        B: {
          B: 1,
        },
      },
      d_d: {
        a: 1,
      },
      f_f: {
        a: 1,
      },
    });
  });

  it('findOne should work correctly', async () => {
    await expect(repository.findOne({})).resolves.toBeDefined();
  });

  it('findAll should work correctly', async () => {
    await expect(repository.findAll({})).resolves.toEqual(arr);
  });
});
