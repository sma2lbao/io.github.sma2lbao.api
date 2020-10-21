import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsResolver } from './playlists.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { ShadowsModule } from '../shadows/shadows.module';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), ShadowsModule],
  providers: [PlaylistsService, PlaylistsResolver],
})
export class PlaylistsModule {}
