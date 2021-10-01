import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from '../../services/services.module';
import { AccountsRepoService } from './accounts-repo.service';

describe('AccountsRepoService', () => {
  let service: AccountsRepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsRepoService],
      imports: [ServicesModule]
    }).compile();

    service = module.get<AccountsRepoService>(AccountsRepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
