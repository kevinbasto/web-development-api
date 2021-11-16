import { Test, TestingModule } from '@nestjs/testing';
import { ToolsModule } from '../../../../tools/tools.module';
import { DeletePrivacyRepoService } from './delete-privacy-repo.service';

describe('DeletePrivacyRepoService', () => {
  let service: DeletePrivacyRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports : [ToolsModule],
      providers: [DeletePrivacyRepoService],
    }).compile();

    service = module.get<DeletePrivacyRepoService>(DeletePrivacyRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
