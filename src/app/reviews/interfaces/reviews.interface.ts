import { registerEnumType } from '@nestjs/graphql';

export enum ReviewMedium {
  MEDIUM = 'medium_review',
  SHADOW = 'shadow_review',
}

registerEnumType(ReviewMedium, {
  name: 'ReviewMedium',
});
