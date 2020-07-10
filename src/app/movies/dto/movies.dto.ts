import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { Region } from '../interfaces/movies.interface';
import { CreateMediumInput } from '@/app/mediums/dto/mediums.dto';
import { Paginated } from '@/global/types/paginated.type';
import { Movie } from '../entities/movie.entity';

@InputType()
export class CreateMovieMediumInput extends CreateMediumInput {
  @Field(() => ID, { nullable: true })
  movie_id?: number;
}

@InputType()
export class CreateCharacterInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  description?: string;
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
  region?: Region;

  @Field(() => [CreateCharacterInput], { nullable: true })
  actors?: CreateCharacterInput[];

  @Field(() => [CreateCharacterInput], { nullable: true })
  directors?: CreateCharacterInput[];

  @Field(() => [ID])
  source_ids?: number[];

  @Field(() => [CreateMovieMediumInput])
  sources?: CreateMovieMediumInput[];
}

@ObjectType()
export class MoviePaginated extends Paginated(Movie) {}
