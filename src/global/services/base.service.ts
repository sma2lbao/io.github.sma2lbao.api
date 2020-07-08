import {
  FindConditions,
  FindManyOptions,
  Repository,
  MoreThan,
  LessThan,
} from 'typeorm';
import {
  PagitionQuery,
  PagitionCursorQuery,
} from '../interfaces/base_service.interface';
import { PaginatedQuery } from '../dto/paginated.dto';

export class BaseService<T> {
  constructor(private repo: Repository<T>) {}

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
    const { key, limit = 10, after, before, order, where } = pagitionQuery;
    let condition = {};
    if (after) {
      condition = {
        [key]: MoreThan(after),
      };
    } else if (before) {
      condition = {
        [key]: LessThan(before),
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

  async findCursorPagition(queryCursor: PagitionCursorQuery<T>): Promise<any> {
    const {
      key,
      query: { first, after, last, before } = {},
      where,
      order,
    } = queryCursor;
    const orderByCursor = {
      [key]: before ? -1 : 1,
    } as {
      [P in keyof T]?: 'ASC' | 'DESC' | 1 | -1;
    };
    const pagitionQuery: PagitionQuery<T> = {
      key: key,
      limit: first || last,
      before: before && this.decodeCursor(before),
      after: after && this.decodeCursor(after),
      order: {
        ...order,
        ...orderByCursor,
      },
      where,
    };
    console.log(typeof pagitionQuery.after);
    const [nodes, total]: [T[], number] = await this.findPagition(
      pagitionQuery,
    );
    const result = {
      edges: nodes.map(node => {
        return {
          node: node,
          cursor: this.encodeCursor(node[key]),
        };
      }),
      hasNextPage: total > nodes.length,
    };
    console.log('total', total);
    return result;
  }

  protected encodeCursor(value: T[keyof T]): string {
    return Buffer.from(JSON.stringify(value)).toString('base64');
  }

  protected decodeCursor(cursor: string): any {
    const dateReviver = (key, value) => {
      console.log(value);
      const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
      if (typeof value === 'string' && datePattern.test(value)) {
        return new Date(value);
      }
      return value;
    };
    return JSON.parse(
      Buffer.from(cursor, 'base64').toString('ascii'),
      dateReviver,
    );
  }
}
