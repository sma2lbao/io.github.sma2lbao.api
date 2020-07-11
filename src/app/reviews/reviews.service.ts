import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Reply } from './entities/reply.entity';
import { BaseService } from '@/global/services/base.service';
import { CreateReviewInput } from './dto/reviews.dto';
import { UsersService } from '@/core/users/users.service';
import { User } from '@/core/users/entities/user.entity';

@Injectable()
export class ReviewsService extends BaseService<Review> {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    private readonly usersService: UsersService,
  ) {
    super(reviewRepository);
  }

  async create(createReview: CreateReviewInput, user?: User): Promise<Review> {
    const { author_uid, ...rest } = createReview;
    const review = this.reviewRepository.create(rest);
    const author = author_uid
      ? await this.usersService.findByUid(author_uid)
      : user;
    if (!author) {
      throw new Error();
    }
    review.author = author;
    return await this.reviewRepository.save(review);
  }
}
