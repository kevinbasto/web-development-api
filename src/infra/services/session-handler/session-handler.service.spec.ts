import { Test, TestingModule } from '@nestjs/testing';
import { SessionHandlerService } from './session-handler.service';

describe('SessionHandlerService', () => {
  let service: SessionHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionHandlerService],
    }).compile();

    service = module.get<SessionHandlerService>(SessionHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
