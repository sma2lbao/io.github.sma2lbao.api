import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { ShadowsModule } from '../shadows/shadows.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), ShadowsModule, CategoriesModule],
  providers: [TagsService, TagsResolver],
})
export class TagsModule {}
