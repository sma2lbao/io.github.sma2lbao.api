import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBulletInput {
  @Field()
  @IsNotEmpty()
  readonly content: string;

  @Field({ nullable: true })
  readonly point: number;

  @Field(type => Int)
  @IsNotEmpty()
  readonly medium_id: number;
}
