import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { UsersModule } from './users/users.module';
import { CoreResolver } from './core.resolver';
import { CoreService } from './core.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    RedisModule,
    DatabaseModule,
    GraphqlModule,
    AuthModule,
    MailerModule,
    UsersModule,
    UploadModule,
  ],
  providers: [CoreResolver, CoreService],
  exports: [CoreService],
})
export class CoreModule {}
