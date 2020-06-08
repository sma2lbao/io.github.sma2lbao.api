import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schemas, configs } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/users/users.module';
import { TagsModule } from './app/tags/tags.module';
import { CategoriesModule } from './app/categories/categories.module';
import { MediumsModule } from './app/mediums/mediums.module';
import { BulletsModule } from './app/bullets/bullets.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: ['.env.development'],
      validationSchema: schemas,
    }),
    UsersModule,
    TagsModule,
    CategoriesModule,
    MediumsModule,
    BulletsModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
