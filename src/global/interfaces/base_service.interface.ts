import { FindConditions } from 'typeorm';

export interface PagitionQuery<T> {
  cursorField: keyof T;
  limit?: number;
  before?: T[PagitionQuery<T>['cursorField']];
  after?: T[PagitionQuery<T>['cursorField']];
  order?: {
    [P in keyof T]?: 'ASC' | 'DESC' | 1 | -1;
  };
  where?: FindConditions<T>[] | FindConditions<T>;
}
