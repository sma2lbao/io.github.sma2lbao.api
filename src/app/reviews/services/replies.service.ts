import { Injectable } from '@nestjs/common';
import { BaseService } from '@/global/services/base.service';
import { Reply } from '../entities/reply.entity';

@Injectable()
export class ReviewsService extends BaseService<Reply> {}
