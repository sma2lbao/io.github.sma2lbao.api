import { InputType, Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Region } from '../interfaces/shadows.interface';
import { Paginated } from '@/global/types/paginated.type';
import { Shadow } from '../entities/shadow.entity';
import { CreateShadowMediumInput } from '@/app/mediums/dto/mediums.dto';

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
export class CreateShadowInput {
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

  @Field(() => [CreateShadowMediumInput], { nullable: true })
  sources?: CreateShadowMediumInput[];
}

@InputType()
export class UpdateShadowInput extends OmitType(CreateShadowInput, [
  'title' as const,
  'cover' as const,
]) {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  cover?: string;
}

@ObjectType()
export class ShadowPaginated extends Paginated(Shadow) {}
