import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { Vote } from './entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediumsService } from '../mediums/services/mediums.service';
import { UsersService } from '@/core/users/users.service';
import { CreateVoteInput } from './dto/votes.dto';
import { User } from '@/core/users/entities/user.entity';
import { UserNotFound } from '@/global/exceptions/users/user.exception';
import { MediumNotFoundException } from '@/global/exceptions/mediums/medium.exception';

@Injectable()
export class VotesService extends BaseService<Vote> {
  constructor(
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    private readonly mediumsService: MediumsService,
    private readonly usersService: UsersService,
  ) {
    super(voteRepository);
  }

  async createOrUpdate(
    createVote: CreateVoteInput,
    owner?: User,
  ): Promise<Vote> {
    const { medium_id, status, owner_uid } = createVote;
    const curOwner = owner
      ? owner
      : await this.usersService.findByUid(owner_uid);
    if (!curOwner) {
      throw new UserNotFound();
    }
    const medium = await this.mediumsService.findOne({ id: medium_id });
    if (!medium) {
      throw new MediumNotFoundException();
    }
    const vote = this.voteRepository.create({
      status,
      owner: curOwner,
      medium: medium,
    });
    return await this.voteRepository.save(vote);
  }
}
