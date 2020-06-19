import { registerEnumType } from '@nestjs/graphql';

export enum ThirdPlatformEnum {
  GITHUB = 'github',
  WECHAT = 'wechat',
}
registerEnumType(ThirdPlatformEnum, {
  name: 'ThirdPlatformEnum',
});
