import { Test, TestingModule } from '@nestjs/testing';
import { EmailAccount } from '../../../../core/instances/auth/email-account';
import { ToolsModule } from '../../../tools/tools.module';
import { CreateAccountService } from './create-account.service';

const account : EmailAccount = {
  email: "test@test.com",
  password: "d8ce1a083fa0ec75532e0660ecdcfce88b4d27052ddb1dad1743cf0cc646cd48d9515d7933963e68e97b53c1d62e150ad347760ec292eba74d4784f7da8409f5",
  accountId: "f915a2c70da770e3129a4f5330096287dadbdbecadb75fe9d32d63af2748fc9b26aa2cc0508c143ea9a7d1e4191a3a98c7468557c5fd3525b1c6530e772436a8",
  verificationToken: "b1985f52b7fca9c770157d7b39e1a0ae9c4093bfd1b394a51d69b5d8a64e319bd53001ece970fea5a1a694749bda846e589dcd8720badb7b538734fd73295be6"
}
const lang : string = "en";

describe('CreateAccountService', () => {
  let CreateAccountRepoService: CreateAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAccountService],
      imports: [ToolsModule]
    }).compile();

    CreateAccountRepoService = module.get<CreateAccountService>(CreateAccountService);
  });

  it('should be defined', () => {
    expect(CreateAccountRepoService).toBeDefined();
  });

  it('should create an account', async() => {
    try {
      await CreateAccountRepoService.createEmailAccount(lang, account);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  })
});
