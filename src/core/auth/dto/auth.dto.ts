import { ObjectType, Field } from '@nestjs/graphql';
import { ThirdPlatformEnum } from '@/core/users/interfaces/users.interface';

@ObjectType()
export class PlatformAuthWay {
  @Field()
  platform: ThirdPlatformEnum;

  @Field()
  url: string;
}
