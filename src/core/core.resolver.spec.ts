import { Test, TestingModule } from '@nestjs/testing';
import { CoreResolver } from './core.resolver';

describe('CoreResolver', () => {
  let resolver: CoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreResolver],
    }).compile();

    resolver = module.get<CoreResolver>(CoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
