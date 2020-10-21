import { registerEnumType } from '@nestjs/graphql';

export enum ReviewMedium {
  MEDIUM = 'medium',
  SHADOW = 'shadow',
}

registerEnumType(ReviewMedium, {
  name: 'ReviewMedium',
});
