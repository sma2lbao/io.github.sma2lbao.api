import { Module } from '@nestjs/common';
import { MediumsService } from './mediums.service';
import { MediumsResolver } from './mediums.resolver';

@Module({
  providers: [MediumsService, MediumsResolver]
})
export class MediumsModule {}
