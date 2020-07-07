import {
  FindConditions,
  FindManyOptions,
  Repository,
  MoreThan,
  LessThan,
} from 'typeorm';
import { PagitionQuery } from '../interfaces/base_service.interface';

export class BaseService<T> {
  constructor(protected repo: Repository<T>) {}

  async findOneByConditions(condtions: FindConditions<T>): Promise<T> {
    return await this.repo.findOne(condtions);
  }

  async findByConditions(condtions: FindConditions<T>): Promise<T[]> {
    return await this.repo.find(condtions);
  }

  async find(query: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(query);
  }

  async findPagition(pagitionQuery: PagitionQuery<T>): Promise<[T[], number]> {
    const {
      cursorField,
      limit = 10,
      after,
      before,
      order,
      where,
    } = pagitionQuery;
    let condition = {};
    if (after) {
      condition = {
        [cursorField]: MoreThan(after),
      };
    } else if (before) {
      condition = {
        [cursorField]: LessThan(before),
      };
    }
    return await this.repo.findAndCount({
      take: limit,
      order: {
        ...order,
      },
      where: {
        ...where,
        ...condition,
      },
    });
  }
}
