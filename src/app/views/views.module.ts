import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsResolver } from './views.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { View } from './entities/view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([View])],
  providers: [ViewsService, ViewsResolver],
})
export class ViewsModule {}
