import { Module } from '@nestjs/common';
import { BulletsService } from './bullets.service';
import { BulletsResolver } from './bullets.resolver';

@Module({
  providers: [BulletsService, BulletsResolver]
})
export class BulletsModule {}
