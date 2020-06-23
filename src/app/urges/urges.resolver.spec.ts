import { Test, TestingModule } from '@nestjs/testing';
import { UrgesResolver } from './urges.resolver';

describe('UrgesResolver', () => {
  let resolver: UrgesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrgesResolver],
    }).compile();

    resolver = module.get<UrgesResolver>(UrgesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
