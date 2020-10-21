import { Module, OnModuleInit } from '@nestjs/common';
import { ShadowsResolver } from './shadows.resolver';
import { ShadowsService } from './shadows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shadow } from './entities/shadow.entity';
import { MediumsModule } from '../mediums/mediums.module';
import { CreateShadowInput } from './dto/shadows.dto';
import { UsersService } from '@/core/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shadow]), MediumsModule],
  providers: [ShadowsResolver, ShadowsService],
  exports: [ShadowsService],
})
export class ShadowsModule implements OnModuleInit {
  constructor(
    private readonly shadowsService: ShadowsService,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit(): Promise<void> {
    for (let i = 1; i <= 99; i++) {
      const shadow: CreateShadowInput = {
        title: `shadow${i.toString().padStart(3, '0')}`,
        cover: `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599499118148&di=5c0774cf80d4e177da28a0e178fe05a9&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20191006%2F18%2F1570356488-vKNlgYMhGu.jpg`,
      };
      const shadowDB = await this.shadowsService.findOne({
        title: shadow.title,
        cover: shadow.cover,
      });
      if (shadowDB) {
        break;
      }
      let author = await this.usersService.findOne({
        username: 'admin',
      });
      if (!author) {
        author = await this.usersService.create({
          username: `admin`,
          password: '000000',
          email: `admin${i.toString().padStart(3, '0')}`,
        });
      }
      await this.shadowsService.create(shadow, author);
    }
  }
}
