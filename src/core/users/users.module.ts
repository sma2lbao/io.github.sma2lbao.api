import { Module, Global } from '@nestjs/common';
import { UsersService } from './users.service';
import { ThirdPlatformService } from './third-platform.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ThirdPlatform } from './entities/third-platform.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, ThirdPlatform])],
  providers: [UsersService, UsersResolver, ThirdPlatformService],
  exports: [UsersService, ThirdPlatformService],
})
export class UsersModule {}
