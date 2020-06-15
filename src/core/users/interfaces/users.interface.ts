import { registerEnumType } from '@nestjs/graphql';

// 第三方可选值
export enum ThirdPlatformEnum {
  GITHUB = 'github',
  WECHAT = 'wechat',
}
registerEnumType(ThirdPlatformEnum, {
  name: 'ThirdPlatformEnum',
});
