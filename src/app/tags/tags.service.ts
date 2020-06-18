import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTagInput } from './dto/tags.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsReposity: Repository<Tag>,
  ) {}

  async created(createTag: CreateTagInput): Promise<Tag> {
    const tag = this.tagsReposity.create(createTag);
    return await this.tagsReposity.save(tag);
  }
}
