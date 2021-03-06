import {
  FindConditions,
  FindManyOptions,
  Repository,
  MoreThan,
  LessThan,
  FindOneOptions,
  ObjectID,
  SelectQueryBuilder,
  QueryRunner,
  // DeepPartial,
} from 'typeorm';
import {
  PagitionQuery,
  PagitionCursorQuery,
} from '../interfaces/base_service.interface';

export class BaseService<T> {
  constructor(private repository: Repository<T>) {}

  createQueryBuilder(
    alias?: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  // hasId(entityLike: DeepPartial<T>): boolean {
  //   const entity = this.repository.create(entityLike);
  //   return this.repository.hasId(entity);
  // }

  async findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;
  async findOne(options?: FindOneOptions<T>): Promise<T | undefined>;
  async findOne(
    conditions?: FindConditions<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;
  async findOne(
    optionsOrConditions?: unknown,
    maybeOptions?: unknown,
  ): Promise<T | undefined> {
    return this.repository.findOne(optionsOrConditions as any, maybeOptions);
  }

  async find(query?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
    return await this.repository.find(query);
  }

  async count(query?: FindManyOptions<T> | FindConditions<T>): Promise<number> {
    return await this.repository.count(query);
  }

  async findPagition(pagitionQuery: PagitionQuery<T>): Promise<[T[], number]> {
    const { key, limit = 10, after, before, order, where } = pagitionQuery;
    let condition = null;
    if (after) {
      condition = {
        [key]: MoreThan(after),
      };
    } else if (before) {
      condition = {
        [key]: LessThan(before),
      };
    }
    let whereRes = condition
      ? where instanceof Array
        ? where.map(item => ({ ...item, ...condition }))
        : {
            ...where,
            ...condition,
          }
      : where;
    console.log(whereRes);
    return await this.repository.findAndCount({
      take: limit,
      order: {
        ...order,
      },
      ...(whereRes ? { where: whereRes } : {}),
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
      [key]: last ? -1 : 1,
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
      ...(where ? { where } : {}),
    };
    const [nodes, total]: [T[], number] = await this.findPagition(
      pagitionQuery,
    );
    const totalCount = await this.count({
      ...(where ? { where } : {}),
    });
    const edges = nodes.map(node => {
      return {
        node: node,
        cursor: this.encodeCursor(node[key]),
      };
    });
    const pageInfo = {
      hasPreviousPage: totalCount - total > 0 ? true : false,
      hasNextPage: total > nodes.length ? true : false,
      startCursor: edges.length > 0 ? edges[0].cursor : '',
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : '',
    };
    const result = {
      edges: edges,
      pageInfo: pageInfo,
      totalCount: totalCount,
    };
    return result;
  }

  protected encodeCursor(value: T[keyof T]): string {
    return Buffer.from(JSON.stringify(value)).toString('base64');
  }

  protected decodeCursor(cursor: string): any {
    const dateReviver = (key: any, value: string | number | Date) => {
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
