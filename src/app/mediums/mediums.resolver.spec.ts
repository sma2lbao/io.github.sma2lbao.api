import { Test, TestingModule } from '@nestjs/testing';
import { MediumsResolver } from './mediums.resolver';

describe('MediumsResolver', () => {
  let resolver: MediumsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediumsResolver],
    }).compile();

    resolver = module.get<MediumsResolver>(MediumsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
