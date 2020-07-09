import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './entities/playlist.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '@/core/auth/guards/gql-auth.guard';
import { CreatePlaylistInput } from './dto/playlists.dto';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';

@Resolver('Playlists')
export class PlaylistsResolver {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Mutation(() => Playlist)
  @UseGuards(GqlJwtAuthGuard)
  async create_playlist(
    @Args('playlist') playlist: CreatePlaylistInput,
    @CurrUser() user: User,
  ): Promise<Playlist> {
    return await this.playlistsService.create(playlist, user);
  }

  @Mutation()
  @UseGuards(GqlJwtAuthGuard)
  async add_movie_to_playlist(
    @Args('movie_id') movie_id: number,
    @Args('playlist_id') playlist_id: number,
    @CurrUser() user: User,
  ): Promise<any> {
    this.playlistsService.addMovieToPlaylist(movie_id, playlist_id, user.uid);
  }
}
