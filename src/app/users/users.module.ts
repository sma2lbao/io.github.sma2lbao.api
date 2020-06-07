import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ThirdPlatform } from './entities/third-platform.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ThirdPlatform])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly userService: UsersService) {}

  async onModuleInit() {
    const user = this.userService.findOne('1');
    console.log(user);
  }
}
