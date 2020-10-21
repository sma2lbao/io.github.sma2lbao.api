import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './entities/playlist.entity';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard, JwtAuthGuard } from '@/core/auth/guards/auth.guard';
import { CreatePlaylistInput, PlaylistPaginated } from './dto/playlists.dto';
import { CurrUser } from '@/core/auth/decorators/auth.decorator';
import { User } from '@/core/users/entities/user.entity';
import { PaginatedQuery } from '@/global/dto/paginated.dto';

@Resolver('Playlists')
export class PlaylistsResolver {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Query(() => PlaylistPaginated)
  @UseGuards(JwtAuthGuard({ required: false }))
  async playlists_paginated(
    @Args('query', { nullable: true }) query: PaginatedQuery,
    @Args('author_uid', { nullable: true }) author_uid: string,
    @Args('author_username', { nullable: true }) author_username: string,
    @CurrUser() user: User,
  ): Promise<PlaylistPaginated> {
    const result = await this.playlistsService.findCursorPagition({
      query: query,
      key: 'create_at',
      where: {
        author: author_username
          ? {
              username: author_username,
            }
          : {
              uid: author_uid ? author_uid : user.uid,
            },
      },
    });
    return result;
  }

  @Query(() => Playlist)
  @UseGuards(GqlJwtAuthGuard)
  async playlist(
    @Args('playlist_id') playlist_id: number,
    @CurrUser() user: User,
  ): Promise<Playlist> {
    return await this.playlistsService.findOneWithShadowsPagition({
      id: playlist_id,
      author: user,
    });
  }

  @Mutation(() => Playlist)
  @UseGuards(GqlJwtAuthGuard)
  async create_playlist(
    @Args('playlist') playlist: CreatePlaylistInput,
    @CurrUser() user: User,
  ): Promise<Playlist> {
    return await this.playlistsService.create(playlist, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlJwtAuthGuard)
  async add_shadow_to_playlist(
    @Args('shadow_id') shadow_id: number,
    @Args('playlist_id') playlist_id: number,
    @CurrUser() user: User,
  ): Promise<boolean> {
    return await this.playlistsService.addShadowToPlaylist(
      shadow_id,
      playlist_id,
      user.uid,
    );
  }
}
