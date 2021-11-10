import { Test, TestingModule } from '@nestjs/testing';
import { FetchUserService } from './fetch-user.service';

describe('FetchUserService', () => {
  let service: FetchUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchUserService],
    }).compile();

    service = module.get<FetchUserService>(FetchUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
