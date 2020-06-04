import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { schemas, configs } from './config'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: configs,
    envFilePath: ['.env.development', '.env.local'],
    validationSchema: schemas
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
