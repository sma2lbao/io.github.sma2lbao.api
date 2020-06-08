import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    RedisModule,
    DatabaseModule,
    GraphqlModule,
    AuthModule,
    MailerModule,
  ],
})
export class CoreModule {}
