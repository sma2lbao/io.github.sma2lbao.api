import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bullet } from './entities/bullet.entity';
import { Repository } from 'typeorm';
import { CreateBulletInput } from './dto/bullet.dto';
import { MediumsService } from '../mediums/mediums.service';

@Injectable()
export class BulletsService {
  constructor(
    @InjectRepository(Bullet)
    private readonly bulletRepository: Repository<Bullet>,
    private readonly mediumsService: MediumsService,
  ) {}

  async create(createBullet: CreateBulletInput): Promise<Bullet> {
    const { medium_id, ...rest } = createBullet;
    const bullet = this.bulletRepository.create(rest);
    const mdeium = await this.mediumsService.findOne({
      id: medium_id,
    });
    if (!mdeium) {
      throw new Error();
    }
    bullet.media = mdeium;
    return await this.bulletRepository.save(bullet);
  }
}
