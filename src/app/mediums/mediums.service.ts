import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medium } from './entities/medium.entity';
import { Repository, FindConditions } from 'typeorm';
import { CreateMediumInput } from './dto/mediums.dto';

@Injectable()
export class MediumsService {
  constructor(
    @InjectRepository(Medium)
    private readonly mediumRepository: Repository<Medium>,
  ) {}

  async create(createMedium: CreateMediumInput): Promise<Medium> {
    const medium = this.mediumRepository.create(createMedium);
    return await this.mediumRepository.save(medium);
  }

  async createMediums(createMediums: CreateMediumInput[]): Promise<Medium[]> {
    const mediums = this.mediumRepository.create(createMediums);
    return await this.mediumRepository.save(mediums);
  }

  async findByConditions(conditions: FindConditions<Medium>): Promise<Medium> {
    return await this.mediumRepository.findOne(conditions);
  }
}
