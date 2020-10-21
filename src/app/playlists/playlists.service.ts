import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { Playlist } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistInput } from './dto/playlists.dto';
import { User } from '@/core/users/entities/user.entity';
import { ShadowsService } from '../shadows/shadows.service';
import { UsersService } from '@/core/users/users.service';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';

@Injectable()
export class PlaylistsService extends BaseService<Playlist> {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,
    private readonly shadowsService: ShadowsService,
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

  async addShadowToPlaylist(
    shadow_id: number,
    playlist_id: number,
    author_uid: string,
  ): Promise<boolean> {
    const shadow = await this.shadowsService.findOne({
      id: shadow_id,
    });
    const author = await this.usersService.findByUid(author_uid);
    const playlist = await this.playlistsRepository.findOne({
      id: playlist_id,
      author: author,
    });
    if (!shadow || !playlist) {
      throw new EntityNotFoundException();
    }
    await this.playlistsRepository
      .createQueryBuilder()
      .relation('shadows')
      .of(playlist)
      .add(shadow);
    return true;
  }

  async findOneWithShadowsPagition(
    optionsOrConditions?: unknown,
    maybeOptions?: unknown,
  ): Promise<Playlist | undefined> {
    const playlist = await this.playlistsRepository.findOne(
      optionsOrConditions as any,
      maybeOptions,
    );
    playlist.shadows = await this.shadowsService
      .createQueryBuilder('shadow')
      .innerJoinAndSelect(Playlist, 'playlist', 'playlist.id = :playlist_id', {
        playlist_id: playlist.id,
      })
      .innerJoinAndMapMany(
        'playlist.shadows',
        'playlist_shadows_shadow',
        'pm',
        'pm.shadow_id = shadow.id',
      )
      // .take(10)
      .getMany();

    return playlist;
  }
}
