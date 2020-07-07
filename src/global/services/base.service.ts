import { FindConditions, FindManyOptions, Repository } from 'typeorm';

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
}
