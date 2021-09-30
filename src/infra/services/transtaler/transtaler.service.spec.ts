import { Test, TestingModule } from '@nestjs/testing';
import { TranslaterService } from './transtaler.service';

describe('TranstalerService', () => {
  let service: TranslaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslaterService],
    }).compile();

    service = module.get<TranslaterService>(TranslaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
