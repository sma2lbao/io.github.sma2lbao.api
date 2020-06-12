import {
  Controller,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AppService } from './app.service';
import { timer } from 'rxjs';
import { Cache } from 'cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    console.log(this.cache);
    await timer(2000).toPromise();
    return this.appService.getHello();
  }
}
