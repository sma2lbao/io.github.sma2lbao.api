import { Test, TestingModule } from '@nestjs/testing';
import { BulletsService } from './bullets.service';

describe('BulletsService', () => {
  let service: BulletsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulletsService],
    }).compile();

    service = module.get<BulletsService>(BulletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
