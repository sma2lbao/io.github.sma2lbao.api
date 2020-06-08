import { registerEnumType } from '@nestjs/graphql';

// 第三方可选值
export enum ThirdPlatformEnum {
  GITHUB = 'github',
}
registerEnumType(ThirdPlatformEnum, {
  name: 'ThirdPlatformEnum',
});
