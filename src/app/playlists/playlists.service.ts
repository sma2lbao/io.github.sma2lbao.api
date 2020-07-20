import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { Playlist } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistInput } from './dto/playlists.dto';
import { User } from '@/core/users/entities/user.entity';
import { MoviesService } from '../movies/movies.service';
import { UsersService } from '@/core/users/users.service';
import { EntityNotFoundException } from '@/global/exceptions/entity-not-found.exception';

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
  ): Promise<boolean> {
    const movie = await this.moviesService.findOne({
      id: movie_id,
    });
    const author = await this.usersService.findByUid(author_uid);
    const playlist = await this.playlistsRepository.findOne({
      id: playlist_id,
      author: author,
    });
    if (!movie || !playlist) {
      throw new EntityNotFoundException();
    }
    await this.playlistsRepository
      .createQueryBuilder()
      .relation('movies')
      .of(playlist)
      .add(movie);
    return true;
  }

  async findOneWithMoviesPagition(
    optionsOrConditions?: unknown,
    maybeOptions?: unknown,
  ): Promise<Playlist | undefined> {
    const playlist = await this.playlistsRepository.findOne(
      optionsOrConditions as any,
      maybeOptions,
    );
    playlist.movies = await this.moviesService
      .createQueryBuilder('movie')
      .innerJoinAndSelect(Playlist, 'playlist', 'playlist.id = :playlist_id', {
        playlist_id: playlist.id,
      })
      .innerJoinAndMapMany(
        'playlist.movies',
        'playlist_movies_movie',
        'pm',
        'pm.movie_id = movie.id',
      )
      // .take(10)
      .getMany();

    return playlist;
  }
}
