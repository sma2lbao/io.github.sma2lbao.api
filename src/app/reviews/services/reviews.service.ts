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

@Injectable()
export class ReviewsService extends BaseService<Review> {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    @InjectRepository(MovieReview)
    private readonly movieReviewRepository: Repository<MovieReview>,
    private readonly usersService: UsersService,
    private readonly moviesService: MoviesService,
  ) {
    super(reviewRepository);
  }

  async create(createReview: CreateReviewInput, user?: User): Promise<Review> {
    const { author_uid, type, medium_id, ...rest } = createReview;
    const author = author_uid
      ? await this.usersService.findByUid(author_uid)
      : user;
    if (!author) {
      throw new Error();
    }
    let review = null;
    if (type === ReviewMedium.MOVIE) {
      const movie = await this.moviesService.findOne({ id: medium_id });
      if (!movie) {
        throw new Error();
      }
      review = this.movieReviewRepository.create(rest);
      review.movie = movie;
      review.author = author;
      return await this.movieReviewRepository.save(review);
    } else {
      review = this.reviewRepository.create(rest);
      review.author = author;
      return await this.reviewRepository.save(review);
    }
  }
}
