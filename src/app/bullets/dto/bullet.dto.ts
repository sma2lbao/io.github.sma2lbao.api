import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewBulletInput {
  @Field()
  @IsNotEmpty({ message: '弹幕不能为空' })
  readonly content: string;

  @Field({ nullable: true })
  readonly point: number;

  @Field(type => Int)
  @IsNotEmpty({ message: 'medium_id 不能为空' })
  readonly medium_id: number;
}
