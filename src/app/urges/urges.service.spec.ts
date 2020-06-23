import { Test, TestingModule } from '@nestjs/testing';
import { UrgesService } from './urges.service';

describe('UrgesService', () => {
  let service: UrgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrgesService],
    }).compile();

    service = module.get<UrgesService>(UrgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
