import { registerEnumType } from '@nestjs/graphql';

// 第三方可选值
export enum ThirdPlatform {
  Github = 'github',
}
registerEnumType(ThirdPlatform, {
  name: 'ThirdPlatform',
});
