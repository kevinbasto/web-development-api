import { Test, TestingModule } from '@nestjs/testing';
import { TranstalerService } from './transtaler.service';

describe('TranstalerService', () => {
  let service: TranstalerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranstalerService],
    }).compile();

    service = module.get<TranstalerService>(TranstalerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
