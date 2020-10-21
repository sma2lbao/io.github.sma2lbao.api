import { Module } from '@nestjs/common';
import { UrgesResolver } from './urges.resolver';
import { UrgesService } from './urges.service';
import { ShadowsModule } from '../shadows/shadows.module';

@Module({
  imports: [ShadowsModule],
  providers: [UrgesResolver, UrgesService],
})
export class UrgesModule {}
