import { MockFetchEmailAccount } from '../../../../testing/repos/accounts/mock-fetch-email-account';
import { MockUpdateEmailAccount } from '../../../../testing/repos/accounts/mock-update-email-account';
import { MockTranslater } from '../../../../testing/tools/mock-translater';
import { AccountNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { EmailVerify } from './email.verify';

const fetchEmailAccount = new MockFetchEmailAccount();
const translater = new MockTranslater();
const updateEmailAccount = new MockUpdateEmailAccount();


const verify = new EmailVerify(fetchEmailAccount, translater, updateEmailAccount);

describe('Verify', () => {
  it('should be defined', () => {
    expect(verify).toBeDefined();
  });

  it('should verify the account', async() => {
    let verificationToken = "test";
    let lang = "en";
    try {
      await verify.verifyEmail(lang, verificationToken);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  })

  it('should reject the verification by having a non existing account', async() => {
    let verificationToken = "testdoesnotexist";
    let lang = "en";
    try {
      await verify.verifyEmail(lang, verificationToken);
    } catch (error) {
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  })
});
