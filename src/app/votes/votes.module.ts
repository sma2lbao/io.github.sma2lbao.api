import { Module } from '@nestjs/common';
import { VotesResolver } from './votes.resolver';
import { VotesService } from './votes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { MediumsModule } from '../mediums/mediums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), MediumsModule],
  providers: [VotesResolver, VotesService],
})
export class VotesModule {}
