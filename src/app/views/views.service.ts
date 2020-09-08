import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { View } from './entities/view.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@/global/services/base.service';

@Injectable()
export class ViewsService extends BaseService<View> {
  constructor(
    @InjectRepository(View) private readonly viewsRepository: Repository<View>,
  ) {
    super(viewsRepository);
  }
}
