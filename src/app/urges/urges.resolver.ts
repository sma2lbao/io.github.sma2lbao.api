import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Shadow } from '../shadows/entities/shadow.entity';
import { UseGuards } from '@nestjs/common';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { UrgesService } from './urges.service';
import { JwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { type } from 'os';

@Resolver('Urges')
export class UrgesResolver {
  constructor(private readonly urgesService: UrgesService) {}

  @Query(() => [Shadow])
  @UseGuards(JwtAuthGuard({ required: false }))
  async shadow_urges(@CurrUser() user?: User): Promise<Shadow[]> {
    return await this.urgesService.findShadowUrges(user);
  }

  @Query(() => [Shadow])
  @UseGuards(JwtAuthGuard({ required: false }))
  async shadow_urges_by_shadow(
    @Args('shadow_id', { type: () => ID }) shadow_id: number,
    @CurrUser() user?: User,
  ): Promise<Shadow[]> {
    return await this.urgesService.findShadowUrges(user);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard({ required: false }))
  async user_urges(@CurrUser() user?: User): Promise<User[]> {
    return await this.urgesService.findUserUrges(user);
  }

  @Query(() => [Shadow])
  @UseGuards(JwtAuthGuard({ required: false }))
  async shadow_next_urges_by_shadow(
    @Args('shadow_id', { type: () => ID }) shadow_id: number,
    @CurrUser() user?: User,
  ): Promise<Shadow[]> {
    return await this.urgesService.findShadowUrges(user);
  }
}
