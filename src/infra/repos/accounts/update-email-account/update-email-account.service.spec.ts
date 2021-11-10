import { Test, TestingModule } from '@nestjs/testing';
import { EmailAccount } from '../../../../core/instances/auth/email-account';
import { ToolsModule } from '../../../tools/tools.module';
import { UpdateEmailAccountService } from './update-email-account.service';

let account: EmailAccount ={
  email : "testupdate@test.com",
  password : "12345",
  accountId: "test",
  isVerified : true,
  registerDate: 1
}

describe('UpdateEmailAccountService', () => {
  let service: UpdateEmailAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateEmailAccountService],
      imports: [ToolsModule]
    }).compile();

    service = module.get<UpdateEmailAccountService>(UpdateEmailAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update the account without any issue', async() => {
    let newAccount : EmailAccount = {...account};
    try {
      await service.updateEmailAccount("en", newAccount)
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
