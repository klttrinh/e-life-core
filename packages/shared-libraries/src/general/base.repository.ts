import { Model } from 'sequelize-typescript';
import {
  Attributes,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindOptions,
  Includeable,
  NonNullFindOptions,
  UpdateOptions,
} from 'sequelize';
import { toSnake } from 'snake-camel';
import { NotFoundException } from '@nestjs/common';
import { PaginationQueryDto } from '../models/general/dtos/pagination.query.dto';
import { paginate, snakeCaseString } from '../utils';

type Constructor<T> = new () => T;
type NonAbstractTypeOfModel<T> = Constructor<T> & typeof Model<T>;
export interface QueryOptions {
  where?: any;
  attributes?: any;
  include?: Includeable | Includeable[];
  plain?: boolean;
  raw?: boolean;
  paranoid?: boolean;
  nest?: boolean;
}

export class BaseRepository<T extends Model> {
  constructor(private readonly model: NonAbstractTypeOfModel<T>) {}

  async create(data: CreationAttributes<T>, extraArgs?: any, options?: CreateOptions<Attributes<T>>): Promise<T> {
    return this.model.create<T>(BaseRepository.toSnakeObjectKeys(data) as any, options);
  }

  /** will throw if not exists */
  async findOne(options?: Partial<NonNullFindOptions<T>>): Promise<T> {
    const res = await this.model.findOne<T>(options);
    if (!res) {
      throw new NotFoundException(`${this.model.name} not found`);
    }
    return res;
  }

  public async findOneSafe(options?: Partial<NonNullFindOptions<T>>): Promise<T | undefined> {
    return this.findOne(options).catch(() => null);
  }

  /** will throw if not exists */
  public async findById(id: number, options?: Omit<Partial<NonNullFindOptions<T>>, 'where'>): Promise<T> {
    return this.findOne({ where: { id }, ...options } as any);
  }

  public async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.model.findAll<T>(options);
  }

  public async findAndCountAll(options?: FindOptions<Attributes<T>>) {
    return this.model.findAndCountAll(options);
  }

  public async count(options?: FindOptions<Attributes<T>>) {
    return this.model.count(options);
  }

  public async updateMany(
    options: UpdateOptions<Attributes<T>>,
    data: Partial<T>,
    ...extraArgs: any
  ): Promise<[affectedCount: number]> {
    return this.model.update(BaseRepository.toSnakeObjectKeys(data), options);
  }

  /** will throw if not exists */
  async updateOne(options: Partial<NonNullFindOptions<T>>, data: Partial<T>, ...extraArgs: any): Promise<T> {
    const res = await this.findOne(options);
    res.set(BaseRepository.toSnakeObjectKeys(data));
    return res.save();
  }

  async updateOneSafe(
    options: Partial<NonNullFindOptions<T>>,
    data: Partial<T>,
    ...extraArgs: any
  ): Promise<T | undefined> {
    const res = await this.findOneSafe(options);
    if (res) {
      res.set(BaseRepository.toSnakeObjectKeys(data));
      return res.save();
    }
  }

  /** will throw if not exists */
  async updateById(id: number, data: Partial<T>, ...extraArgs: any): Promise<T> {
    return this.updateOne({ where: { id } as any }, BaseRepository.toSnakeObjectKeys(data), ...extraArgs);
  }

  async updateByIdSafe(id: number, data: Partial<T>, ...extraArgs: any): Promise<T | undefined> {
    return this.updateOneSafe({ where: { id } as any }, BaseRepository.toSnakeObjectKeys(data), ...extraArgs);
  }

  public async delete(options: DestroyOptions<Attributes<T>>, ...extraArgs: any): Promise<number> {
    return this.model.destroy(options);
  }

  async deleteById(id: number, ...extraArgs: any): Promise<number> {
    return this.delete({ where: { id } as any }, ...extraArgs);
  }

  public async query(
    { _start, _end, _sort, _order, ...rest }: PaginationQueryDto,
    { where, include, plain, raw = true, attributes, paranoid, nest }: QueryOptions = {},
  ): Promise<{ count: number; rows: T[] }> {
    return paginate(this.model, _start, _end, {
      order: _order,
      sort: _sort,
      where: {
        ...toSnake(rest),
        ...where,
      },
      include,
      plain,
      attributes,
      paranoid,
      nest,
      raw,
    });
  }

  public static toSnakeObjectKeys(data: object) {
    Object.keys(data).forEach((key) => {
      const origin = data[key];
      delete data[key];
      data[snakeCaseString(key)] = origin;
    });
    return data;
  }
}
