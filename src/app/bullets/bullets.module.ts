import { Module } from '@nestjs/common';
import { BulletsService } from './bullets.service';
import { BulletsResolver } from './bullets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bullet } from './entities/bullet.entity';
import { MediumsModule } from '../mediums/mediums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bullet]), MediumsModule],
  providers: [BulletsService, BulletsResolver],
})
export class BulletsModule {}
