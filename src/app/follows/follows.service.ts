import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/global/services/base.service';
import { CreateFollowInput, DeleteFollowInput } from './dto/follows.dto';
import { User } from '@/core/users/entities/user.entity';
import { UsersService } from '@/core/users/users.service';
import { UserNotFound } from '@/global/exceptions/users/user.exception';
import {
  FollowerOwnerRepeat,
  FollowNotFound,
  FollowExisted,
} from '@/global/exceptions/follows/follow.exception';

@Injectable()
export class FollowsService extends BaseService<Follow> {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    private readonly usersService: UsersService,
  ) {
    super(followRepository);
  }

  async create(
    createFollow: CreateFollowInput,
    follower?: User,
  ): Promise<Follow> {
    const { owner_uid, follower_uid } = createFollow;
    const owner = await this.usersService.findByUid(owner_uid);
    follower = follower_uid
      ? await this.usersService.findByUid(follower_uid)
      : follower;
    if (!follower) {
      throw new UserNotFound();
    }
    if (follower.uid === owner.uid) {
      throw new FollowerOwnerRepeat();
    }
    const followLocal = await this.findOne({
      owner: owner,
      follower: follower,
    });
    if (followLocal) {
      throw new FollowExisted();
    }

    const follow = this.followRepository.create();
    follow.follower = follower;
    follow.owner = owner;
    return await this.followRepository.save(follow);
  }

  async remove(
    deleteFollow: DeleteFollowInput,
    follower?: User,
  ): Promise<Follow> {
    const { owner_uid, follower_uid } = deleteFollow;
    const owner = await this.usersService.findByUid(owner_uid);
    follower = follower_uid
      ? await this.usersService.findByUid(follower_uid)
      : follower;
    if (!follower) {
      throw new UserNotFound();
    }
    const follow = await this.findOne({
      owner: owner,
      follower: follower,
    });
    if (!follow) {
      throw new FollowNotFound();
    }
    return await this.followRepository.remove(follow);
  }
}
