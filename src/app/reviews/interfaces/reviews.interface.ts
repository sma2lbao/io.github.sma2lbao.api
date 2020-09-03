import { registerEnumType } from '@nestjs/graphql';

export enum ReviewMedium {
  MEDIUM = 'medium',
  MOVIE = 'movie',
}

registerEnumType(ReviewMedium, {
  name: 'ReviewMedium',
});
