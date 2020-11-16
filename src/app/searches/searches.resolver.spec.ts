import { Test, TestingModule } from '@nestjs/testing';
import { SearchesResolver } from './searches.resolver';

describe('SearchesResolver', () => {
  let resolver: SearchesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchesResolver],
    }).compile();

    resolver = module.get<SearchesResolver>(SearchesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
