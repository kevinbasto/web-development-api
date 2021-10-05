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

  it('should create a test account', async () => {
    try{
      let email    : string = "testfate@test.com";
      let password : string = "pasword test for the love";
      service.createEmailAccount(email, password)
    }catch(exception){
      console.log(exception);
      expect(exception).toBeUndefined();
    }
  })
});
