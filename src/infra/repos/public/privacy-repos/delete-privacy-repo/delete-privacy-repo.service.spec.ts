import { Test, TestingModule } from '@nestjs/testing';
import { DeletePrivacyRepoService } from './delete-privacy-repo.service';

describe('DeletePrivacyRepoService', () => {
  let service: DeletePrivacyRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePrivacyRepoService],
    }).compile();

    service = module.get<DeletePrivacyRepoService>(DeletePrivacyRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
