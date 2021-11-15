import { Test, TestingModule } from '@nestjs/testing';
import { EditPrivacyRepoService } from './edit-privacy-repo.service';

describe('EditPrivacyRepoService', () => {
  let service: EditPrivacyRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditPrivacyRepoService],
    }).compile();

    service = module.get<EditPrivacyRepoService>(EditPrivacyRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
