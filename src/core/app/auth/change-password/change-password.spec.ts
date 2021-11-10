import { PasswordCypherService } from '../../../../infra/tools/password-cypher/password-cypher.service';
import { MockFetchEmailAccount } from '../../../../testing/repos/accounts/mock-fetch-email-account';
import { MockUpdateEmailAccount } from '../../../../testing/repos/accounts/mock-update-email-account';
import { MockTranslater } from '../../../../testing/tools/mock-translater';
import { EmailPasswordChangeDto } from '../../../dto/auth/email-password-change-dto';
import { AccountNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { ChangePassword } from './change-password';

const fetchEmailAccount = new MockFetchEmailAccount();
const passwordCypher = new PasswordCypherService();
const updateEmailAccount = new MockUpdateEmailAccount();
const translater = new MockTranslater();

const changePassword = new ChangePassword(fetchEmailAccount, passwordCypher, updateEmailAccount, translater);

describe('ChangePassword', () => {
  it('should be defined', () => {
    expect(changePassword).toBeDefined();
  });

  it("should update the new password", async() => {
    let recoverToken = "test";
    let passwordChange : EmailPasswordChangeDto= {
      password : "kikiwatasu",
      verifyPassword: "kikiwatasu"
    }
    try {
      let message = await changePassword.changePassword("en", recoverToken, passwordChange)
      expect(message).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should reject the new update because the token is not registered', async() => {
    let recoverToken = "testnonexisting";
    let passwordChange : EmailPasswordChangeDto= {
      password : "kikiwatasu",
      verifyPassword: "kikiwatasu"
    }
    try {
      let message = await changePassword.changePassword("en", recoverToken, passwordChange)
    } catch (error) {
      expect(error).toBeInstanceOf(AccountNotFoundException)
    }
  });

  it('should reject the new update because the passwords missmatched', async() => {
    let recoverToken = "test";
    let passwordChange : EmailPasswordChangeDto= {
      password : "kikiwatasu",
      verifyPassword: "kikiwatasu1"
    }
    try {
      
      let message = await changePassword.changePassword("en", recoverToken, passwordChange)
    } catch (error) {
      expect(error).toBeInstanceOf(AccountNotFoundException)
    }
  });
});
