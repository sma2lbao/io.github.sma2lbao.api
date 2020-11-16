import { Module } from '@nestjs/common';
import { SearchesService } from './searches.service';
import { SearchesResolver } from './searches.resolver';
import { ShadowsModule } from '../shadows/shadows.module';

@Module({
  imports: [ShadowsModule],
  providers: [SearchesService, SearchesResolver],
})
export class SearchesModule {}
