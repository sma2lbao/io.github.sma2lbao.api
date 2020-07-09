import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsResolver } from './playlists.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), MoviesModule],
  providers: [PlaylistsService, PlaylistsResolver],
})
export class PlaylistsModule {}
