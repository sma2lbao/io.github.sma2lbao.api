import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AppService } from './app.service';
import { noop, timer } from 'rxjs';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @CacheKey('custom_key')
  @CacheTTL(20)
  @Get()
  async getHello(): Promise<string> {
    await timer(2000).toPromise();
    return this.appService.getHello();
  }
}
