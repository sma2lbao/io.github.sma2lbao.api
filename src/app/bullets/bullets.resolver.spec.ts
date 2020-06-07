import { Test, TestingModule } from '@nestjs/testing';
import { BulletsResolver } from './bullets.resolver';

describe('BulletsResolver', () => {
  let resolver: BulletsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BulletsResolver],
    }).compile();

    resolver = module.get<BulletsResolver>(BulletsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
