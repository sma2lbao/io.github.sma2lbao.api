import { Module, OnModuleInit } from '@nestjs/common';
import { ShadowsResolver } from './shadows.resolver';
import { ShadowsService } from './shadows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shadow } from './entities/shadow.entity';
import { MediumsModule } from '../mediums/mediums.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shadow]), MediumsModule, TagsModule],
  providers: [ShadowsResolver, ShadowsService],
  exports: [ShadowsService],
})
export class ShadowsModule {}
