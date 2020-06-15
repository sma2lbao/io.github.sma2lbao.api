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
  @IsNotEmpty({ message: "username can't be null" })
  readonly username: string;

  @Field()
  @IsNotEmpty({ message: "password can't be null" })
  readonly password: string;

  @Field()
  @IsEmail({}, { message: 'email format error' })
  @IsNotEmpty({ message: "eamil can't be null" })
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
  @IsNotEmpty({ message: "verify code can't be null" })
  readonly code: string;
}

@InputType()
export class CreateThirdUserInput {
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
