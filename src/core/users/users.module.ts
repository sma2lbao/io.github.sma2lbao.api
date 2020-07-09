import { Module, OnModuleInit, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ThirdPlatform } from './entities/third-platform.entity';
import { CreateUserInput } from './dto/users.dto';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, ThirdPlatform])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit(): Promise<void> {
    for (let i = 1; i <= 99; i++) {
      const user: CreateUserInput = {
        username: `sma2lbao${i.toString().padStart(3, '0')}`,
        password: '000000',
        email: `sma2lbao${i.toString().padStart(3, '0')}`,
      };
      const userDB = await this.usersService.findOne({
        username: user.username,
        email: user.email,
      });
      if (userDB) {
        break;
      }
      await this.usersService.create(user);
    }
  }
}
