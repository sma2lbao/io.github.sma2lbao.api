import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { ThirdPlatform } from './entities/third-platform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { CreateThirdPlatformInput } from './dto/users.dto';
import { ThirdPlatformEnum } from './interfaces/users.interface';

@Injectable()
export class ThirdPlatformService extends BaseService<ThirdPlatform> {
  constructor(
    @InjectRepository(ThirdPlatform)
    private readonly thirdPlatformRepository: Repository<ThirdPlatform>,
    private readonly usersService: UsersService,
  ) {
    super(thirdPlatformRepository);
  }

  async create(
    createThirdPlatform: CreateThirdPlatformInput,
  ): Promise<ThirdPlatform> {
    const { user, user_uid, ...rest } = createThirdPlatform;
    let theirUser = null;
    if (user_uid) {
      theirUser = await this.usersService.findByUid(user_uid);
    } else {
      theirUser = await this.usersService.createThirdUser(user);
    }
    if (!theirUser) {
      throw new Error();
    }
    const thirdPlatform = this.thirdPlatformRepository.create(rest);
    thirdPlatform.user = theirUser;
    return await this.thirdPlatformRepository.save(thirdPlatform);
  }

  async findByOpenidAndPlatform(
    openid: string,
    platform: ThirdPlatformEnum,
  ): Promise<ThirdPlatform> {
    return await this.thirdPlatformRepository.findOne({
      where: {
        openid: openid,
        platform: platform,
      },
      relations: ['user'],
    });
  }
}
