import { Test, TestingModule } from '@nestjs/testing';
import { ToolsModule } from '../tools.module';
import { TranslaterService } from './transtaler.service';

describe('TranstalerService', () => {
  let service: TranslaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslaterService],
      imports: [ToolsModule]
    }).compile();

    service = module.get<TranslaterService>(TranslaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
