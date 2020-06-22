import { registerEnumType } from '@nestjs/graphql';

export enum Region {
  Mainland = 'mainland',
  America = 'america',
  Hongkong = 'hongkong',
  Taiwan = 'taiwan',
  Britain = 'britain',
  India = 'india',
}
registerEnumType(Region, {
  name: 'Region',
});

export interface Character {
  name: string;
  avatar?: string;
  description?: string;
}
