import { Test, TestingModule } from '@nestjs/testing';
import { CredentialHandlerService } from './credential-handler.service';

describe('CredentialHandlerService', () => {
  let service: CredentialHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CredentialHandlerService],
    }).compile();

    service = module.get<CredentialHandlerService>(CredentialHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
