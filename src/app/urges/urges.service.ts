import { Injectable } from '@nestjs/common';
import { ShadowsService } from '../shadows/shadows.service';
import { Shadow } from '../shadows/entities/shadow.entity';
import { User } from '@/core/users/entities/user.entity';
import { UsersService } from '@/core/users/users.service';

@Injectable()
export class UrgesService {
  constructor(
    private readonly shadowsService: ShadowsService,
    private readonly usersService: UsersService,
  ) {}

  async findShadowUrges(user?: User): Promise<Shadow[]> {
    const shadows = await this.shadowsService.find({
      take: 8,
      order: {
        create_at: 'DESC',
      },
    });
    return shadows;
  }

  async findUserUrges(user?: User): Promise<User[]> {
    const users = await this.usersService.find({
      take: 3,
    });
    return users;
  }
}
