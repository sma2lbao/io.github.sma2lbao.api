import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { Paginated } from '@/global/types/paginated.type';
import { Playlist } from '../entities/playlist.entity';

@InputType()
export class CreatePlaylistInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  cover: string;
}

@ObjectType()
export class PlaylistPaginated extends Paginated(Playlist) {}
