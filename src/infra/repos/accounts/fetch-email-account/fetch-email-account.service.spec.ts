import { Test, TestingModule } from '@nestjs/testing';
import { EmailAccount } from '../../../../core/instances/auth/email-account';
import { ToolsModule } from '../../../tools/tools.module';
import { FetchEmailAccountService } from './fetch-email-account.service';

describe('FetchEmailAccountService', () => {
  let service: FetchEmailAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchEmailAccountService],
      imports : [ToolsModule]
    }).compile();

    service = module.get<FetchEmailAccountService>(FetchEmailAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch an account', async() => {
    let email : string = "fetch@account.com";
    let lang : string = "en";
    try {
      let account : EmailAccount = await service.fetchAccountByEmail(lang, email);
      expect(account).toBeDefined();
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  })
});
