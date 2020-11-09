import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shadow } from './entities/shadow.entity';
import { Repository, In } from 'typeorm';
import { CreateShadowInput, UpdateShadowInput } from './dto/shadows.dto';
import { User } from '@/core/users/entities/user.entity';
import { BaseService } from '@/global/services/base.service';
import { ShadowMediumsService } from '../mediums/services/shadow_mediums.service';
import { CreateShadowMediumInput } from '../mediums/dto/mediums.dto';
import { UserNotFound } from '@/global/exceptions/users/user.exception';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class ShadowsService extends BaseService<Shadow> {
  constructor(
    @InjectRepository(Shadow)
    private readonly shadowRepository: Repository<Shadow>,
    private readonly shadowMediumsService: ShadowMediumsService,
    private readonly tagsService: TagsService,
  ) {
    super(shadowRepository);
  }

  async create(
    createShadow: CreateShadowInput,
    author?: User,
  ): Promise<Shadow> {
    const { sources, ...rest } = createShadow;
    const shadow = this.shadowRepository.create(rest);
    if (!author) {
      throw new UserNotFound();
    }
    // TODO
    // if (source_ids && source_ids.length > 0) {
    //   const sources = await this.shadowMediumsService.find({
    //     where: {
    //       id: In(source_ids),
    //     },
    //   });
    //   if (sources.length !== source_ids.length) {
    //     throw new Error();
    //   }
    //   shadow.sources = sources;
    // }
    if (sources && sources.length > 0) {
      const shadowMediums = await this.shadowMediumsService.create(sources);
      shadow.sources = shadowMediums;
    }
    shadow.author = author;
    return await this.shadowRepository.save(shadow);
  }

  async updateById(
    shadow_id: number,
    updateShadow: UpdateShadowInput,
    author?: User,
  ): Promise<Shadow> {
    const shadow = await this.shadowRepository.findOne(shadow_id);
    const saveShadow = this.shadowRepository.merge(shadow, updateShadow);
    return await this.create(saveShadow, author);
  }

  async addMediumsToShadow(
    shadow_id: number,
    createShadowMedium: CreateShadowMediumInput,
  ): Promise<Shadow> {
    const shadow = await this.shadowRepository.findOne(shadow_id);
    const shadowMedium = await this.shadowMediumsService.create(
      createShadowMedium,
    );
    if (!shadow || !shadowMedium) {
      throw new EntityNotFoundException();
    }
    await this.shadowRepository
      .createQueryBuilder()
      .relation('sources')
      .of(shadow)
      .add(shadowMedium);
    return await this.shadowRepository.findOne(shadow_id);
  }

  async addTagsToShadow(shadow_id: number, tag_ids: number[]) {
    const shadow = await this.shadowRepository.findOne(shadow_id);
    if (!shadow) {
      throw new EntityNotFoundException();
    }
    const tags = await this.tagsService.find({
      where: {
        id: In(tag_ids),
      },
    });

    if (tags.length !== tag_ids.length) {
      throw new EntityNotFoundException();
    }

    await this.shadowRepository
      .createQueryBuilder()
      .relation('tags')
      .of(shadow)
      .add(tags);
    return await this.shadowRepository.findOne(shadow_id);
  }
}
