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

  it('should fetch an account with a given email', async() => {
    let email : string = "fetch@account.com";
    let lang : string = "en";
    try {
      let account : EmailAccount = await service.fetchAccountByEmail(lang, email);
      expect(account).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should fetch an account with the verificationToken', async() => {
    let verificationToken : string = "4ad1cb46ffd945294aa32e53205cdaf4";
    let lang : string = "en";
    try {
      let account = await service.fetchAccountByVerificationToken(lang, verificationToken);
      expect(account).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
