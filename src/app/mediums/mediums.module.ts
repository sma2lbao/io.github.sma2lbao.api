import { Module } from '@nestjs/common';
import { MediumsService } from './services/mediums.service';
import { ShadowMediumsService } from './services/shadow_mediums.service';
import { MediumsResolver } from './mediums.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medium } from './entities/medium.entity';
import { ShadowMedium } from './entities/shadow_medium.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medium, ShadowMedium])],
  providers: [MediumsService, ShadowMediumsService, MediumsResolver],
  exports: [MediumsService, ShadowMediumsService],
})
export class MediumsModule {}
