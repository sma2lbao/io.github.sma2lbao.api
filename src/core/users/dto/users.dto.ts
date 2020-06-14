import { IsEmail, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { ThirdPlatformEnum } from '../interfaces/users.interface';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  readonly nickname?: string;

  @Field({ nullable: true })
  readonly avatar?: string;

  @Field({ nullable: true })
  readonly mobile?: string;

  @Field({ nullable: true })
  readonly address?: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field({ nullable: true })
  readonly password?: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @Field()
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @Field()
  @IsEmail({}, { message: '邮箱格式错误' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  readonly email: string;

  @Field({ nullable: true })
  readonly nickname?: string;

  @Field({ nullable: true })
  readonly avatar?: string;

  @Field({ nullable: true })
  readonly mobile?: string;

  @Field({ nullable: true })
  readonly address?: string;

  @Field({ nullable: true })
  readonly description?: string;
}

@InputType()
export class CreateUserWithCodeInput extends CreateUserInput {
  @Field()
  @IsNotEmpty({ message: '验证码不能为空' })
  readonly code: string;
}

@InputType()
export class NewThirdUserInput {
  @Field()
  readonly openid?: string;

  @Field({ nullable: true })
  readonly uid?: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly platform: ThirdPlatformEnum;

  @Field(type => CreateUserInput)
  readonly user: CreateUserInput;
}
