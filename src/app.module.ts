import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { schemas, configs } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './app/tags/tags.module';
import { CategoriesModule } from './app/categories/categories.module';
import { MediumsModule } from './app/mediums/mediums.module';
import { BulletsModule } from './app/bullets/bullets.module';
import { CoreModule } from './core/core.module';
import { ShadowsModule } from './app/shadows/shadows.module';
import { TopicsModule } from './app/topics/topics.module';
import { UrgesModule } from './app/urges/urges.module';
import { ReviewsModule } from './app/reviews/reviews.module';
import { PlaylistsModule } from './app/playlists/playlists.module';
import { FollowsModule } from './app/follows/follows.module';
import { VotesModule } from './app/votes/votes.module';
import { ViewsModule } from './app/views/views.module';
import { SearchesModule } from './app/searches/searches.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: [`.env.${process.env.NODE_ENV || 'local'}`],
      validationSchema: schemas,
    }),
    TagsModule,
    CategoriesModule,
    MediumsModule,
    BulletsModule,
    CoreModule,
    ShadowsModule,
    TopicsModule,
    UrgesModule,
    ReviewsModule,
    PlaylistsModule,
    FollowsModule,
    VotesModule,
    ViewsModule,
    SearchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
