import { InputType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Paginated } from '@/global/types/paginated.type';
import { CreateVideoMediumInput } from '@/app/mediums/dto/mediums.dto';
import { Video } from '../entities/video.entity';

@InputType()
export class CreateVideoInput {
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

  @Field(() => [CreateVideoMediumInput], { nullable: true })
  sources?: CreateVideoMediumInput[];
}

@InputType()
export class UpdateVideoInput extends OmitType(CreateVideoInput, [
  'title' as const,
  'cover' as const,
]) {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  cover?: string;
}

@ObjectType()
export class VideoPaginated extends Paginated(Video) {}
