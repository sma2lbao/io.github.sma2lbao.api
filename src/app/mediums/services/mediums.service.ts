import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medium } from '../entities/medium.entity';
import { Repository } from 'typeorm';
import { CreateMediumInput } from '../dto/mediums.dto';
import { BaseService } from '@/global/services/base.service';

@Injectable()
export class MediumsService extends BaseService<Medium> {
  constructor(
    @InjectRepository(Medium)
    private readonly mediumRepository: Repository<Medium>,
  ) {
    super(mediumRepository);
  }

  async create(createMediums: CreateMediumInput[]): Promise<Medium[]>;
  async create(createMedium: CreateMediumInput): Promise<Medium>;
  async create(mediumOrMediums: unknown): Promise<any> {
    const entityOrEntities = this.mediumRepository.create(mediumOrMediums);
    return await this.mediumRepository.save(entityOrEntities);
  }
}
