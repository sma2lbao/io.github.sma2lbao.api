import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Reply } from '../entities/reply.entity';
import { BaseService } from '@/global/services/base.service';
import { CreateReviewInput } from '../dto/reviews.dto';
import { UsersService } from '@/core/users/users.service';
import { User } from '@/core/users/entities/user.entity';
import { MovieReview } from '../entities/movie_review.entity';
import { ReviewMedium } from '../interfaces/reviews.interface';
import { MoviesService } from '../../movies/movies.service';
import { UserNotFound } from '@/global/exceptions/users/user.exception';
import { EntityNotFoundException } from '@/global/exceptions/base.exception';
import { MediumsService } from '@/app/mediums/services/mediums.service';
import { MediumReview } from '../entities/medium_review.entity';

@Injectable()
export class ReviewsService extends BaseService<Review> {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    @InjectRepository(MediumReview)
    private readonly mediumReviewRepository: Repository<MediumReview>,
    @InjectRepository(MovieReview)
    private readonly movieReviewRepository: Repository<MovieReview>,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
    private readonly mediumsService: MediumsService,
  ) {
    super(reviewRepository);
  }

  async create(createReview: CreateReviewInput, user?: User): Promise<Review> {
    const { author_uid, type, type_id, ...rest } = createReview;
    const author = author_uid
      ? await this.usersService.findByUid(author_uid)
      : user;
    if (!author) {
      throw new UserNotFound();
    }
    let review = null;
    if (type === ReviewMedium.MOVIE) {
      const movie = await this.moviesService.findOne({ id: type_id });
      if (!movie) {
        throw new EntityNotFoundException();
      }
      review = this.movieReviewRepository.create(rest);
      review.movie = movie;
      review.author = author;
      return await this.movieReviewRepository.save(review);
    } else {
      const medium = await this.mediumsService.findOne({ id: type_id });
      if (!medium) {
        throw new EntityNotFoundException();
      }
      review = this.mediumReviewRepository.create(rest);
      review.medium = medium;
      review.author = author;
      return await this.mediumReviewRepository.save(review);
    }
  }
}
