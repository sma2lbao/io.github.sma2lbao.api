import { registerEnumType } from '@nestjs/graphql';

export enum ReviewMedium {
  MOVIE = 'movie',
}

registerEnumType(ReviewMedium, {
  name: 'ReviewMedium',
});
