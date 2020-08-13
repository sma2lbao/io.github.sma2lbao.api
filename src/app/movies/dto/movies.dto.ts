import {
  InputType,
  Field,
  ID,
  ObjectType,
  PickType,
  OmitType,
} from '@nestjs/graphql';
import { Region } from '../interfaces/movies.interface';
import { Paginated } from '@/global/types/paginated.type';
import { Movie } from '../entities/movie.entity';
import { CreateMovieMediumInput } from '@/app/mediums/dto/mediums.dto';

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  sub_title?: string;

  @Field({ nullable: true })
  alias_title?: string;

  @Field()
  cover: string;

  @Field(() => [String], { nullable: true })
  posters?: string[];

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  region?: Region;

  @Field(() => [CreateCharacterInput], { nullable: true })
  credits?: CreateCharacterInput[];

  // @Field(() => [ID])
  // source_ids?: number[];

  @Field(() => [CreateMovieMediumInput], { nullable: true })
  sources?: CreateMovieMediumInput[];
}

@InputType()
export class UpdateMovieInput extends OmitType(CreateMovieInput, [
  'title' as const,
  'cover' as const,
]) {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  cover?: string;
}

@ObjectType()
export class MoviePaginated extends Paginated(Movie) {}
