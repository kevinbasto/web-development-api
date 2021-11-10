import { TokenGeneratorService } from '../../../../infra/tools/token-generator/token-generator.service';
import { MockFetchEmailAccount } from '../../../../testing/repos/accounts/mock-fetch-email-account';
import { MockUpdateEmailAccount } from '../../../../testing/repos/accounts/mock-update-email-account';
import { AccountNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { Recover } from './email.recover';

const fetchEmailAccount = new MockFetchEmailAccount();
const tokenGenerator = new TokenGeneratorService();
const updateEmailAccount = new MockUpdateEmailAccount();

const recover = new Recover(fetchEmailAccount, tokenGenerator, updateEmailAccount);

describe('Recover', () => {
  it('should be defined', () => {
    expect(recover).toBeDefined();
  });

  it('should generate the token succesfully', async() => {
    let email = "test2@test.com";
    let lang = "en";
    try {
      let token : string = await recover.GenerateRecoverToken(lang, email);
      console.log(token);
      expect(token).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should throw a account not found exception', async() => {
    let email = "accountdoesnotexist@test.com";
    let lang = "en";
    try {
      let token : string = await recover.GenerateRecoverToken(lang, email);
    } catch (error) {
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  })
});
