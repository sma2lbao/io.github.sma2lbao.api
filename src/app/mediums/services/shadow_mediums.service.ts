import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShadowMediumInput } from '../dto/mediums.dto';
import { BaseService } from '@/global/services/base.service';
import { ShadowMedium } from '../entities/shadow_medium.entity';

@Injectable()
export class ShadowMediumsService extends BaseService<ShadowMedium> {
  constructor(
    @InjectRepository(ShadowMedium)
    private readonly shadowMediumRepository: Repository<ShadowMedium>,
  ) {
    super(shadowMediumRepository);
  }

  async create(
    createShadowMediums: CreateShadowMediumInput[],
  ): Promise<ShadowMedium[]>;
  async create(
    createShadowMedium: CreateShadowMediumInput,
  ): Promise<ShadowMedium>;
  async create(mediumOrMediums: unknown): Promise<any> {
    const entityOrEntities = this.shadowMediumRepository.create(
      mediumOrMediums,
    );
    return await this.shadowMediumRepository.save(entityOrEntities);
  }
}
