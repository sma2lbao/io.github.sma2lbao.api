import { FindConditions } from 'typeorm';
import { PaginatedQuery } from '../dto/paginated.dto';

export interface PagitionQuery<T> {
  key: keyof T;
  limit?: number;
  before?: T[PagitionQuery<T>['key']];
  after?: T[PagitionQuery<T>['key']];
  order?: {
    [P in keyof T]?: 'ASC' | 'DESC' | 1 | -1;
  };
  where?: FindConditions<T>[] | FindConditions<T>;
}

export interface PagitionCursorQuery<T>
  extends Pick<PagitionQuery<T>, 'order' | 'where'> {
  query?: PaginatedQuery;
  key: keyof T;
}
