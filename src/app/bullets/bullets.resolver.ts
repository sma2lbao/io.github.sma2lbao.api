import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BulletsService } from './bullets.service';
import { Bullet } from './entities/bullet.entity';
import { CreateBulletInput } from './dto/bullet.dto';

@Resolver('Bullets')
export class BulletsResolver {
  constructor(private readonly bulletsService: BulletsService) {}

  @Mutation(returns => Bullet)
  async create_bullet(
    @Args('bullet') createBullet: CreateBulletInput,
  ): Promise<Bullet> {
    return await this.bulletsService.create(createBullet);
  }
}
