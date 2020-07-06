import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsResolver } from './playlists.resolver';

@Module({
  providers: [PlaylistsService, PlaylistsResolver]
})
export class PlaylistsModule {}
