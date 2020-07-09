import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { Playlist } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistInput } from './dto/playlists.dto';
import { User } from '@/core/users/entities/user.entity';
import { MoviesService } from '../movies/movies.service';
import { UsersService } from '@/core/users/users.service';

@Injectable()
export class PlaylistsService extends BaseService<Playlist> {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    private readonly moviesService: MoviesService,
    private readonly usersService: UsersService,
  ) {
    super(playlistsRepository);
  }

  async create(
    createPlaylist: CreatePlaylistInput,
    author?: User,
  ): Promise<Playlist> {
    const playlist = this.playlistsRepository.create(createPlaylist);
    playlist.author = author;
    return await this.playlistsRepository.save(playlist);
  }

  async addMovieToPlaylist(
    movie_id: number,
    playlist_id: number,
    author_uid: string,
  ) {
    const movie = await this.moviesService.findOne({
      id: movie_id,
    });
    const author = await this.usersService.findByUid(author_uid);
    const playlist = await this.playlistsRepository.findOne({
      id: playlist_id,
      author: author,
    });
  }
}
