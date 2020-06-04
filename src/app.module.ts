import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { schemas, configs } from './config'
import { AuthModule } from './shared/auth/auth.module';
import { UsersModule } from './shared/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: configs,
    envFilePath: ['.env.development', '.env.local'],
    validationSchema: schemas
  }), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
