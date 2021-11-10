import { PasswordCypherService } from '../../../../infra/tools/password-cypher/password-cypher.service';
import { MockFetchEmailAccount } from '../../../../testing/repos/accounts/mock-fetch-email-account';
import { MockFetcUser } from '../../../../testing/repos/users/mock-fetch-user';
import { MockSessionHandler } from '../../../../testing/tools/mock-session-handler';
import { AccountUnverifiedException } from '../../../exceptions/account/account-unverified.exception';
import { PasswordMismatchException } from '../../../exceptions/account/password-mismatch.exception';
import { AccountNotFoundException } from '../../../exceptions/user/user-not-found.exception';
import { EmailLogin } from './email.login';


const fetchEmailAccountRepo = new MockFetchEmailAccount();
const passwordCypher = new PasswordCypherService();
const sessionGenerator = new MockSessionHandler();
const fetchUserRepo = new MockFetcUser();

const emailLogin = new EmailLogin(fetchEmailAccountRepo, passwordCypher, sessionGenerator, fetchUserRepo);

describe('Login', () => {
  it('should be defined', () => {
    expect(emailLogin).toBeDefined();
  });

  it('should log in', async() => {
    let email    : string = "test2@test.com";
    let password : string = "12345"
    try {
      await emailLogin.login("en", { email : email, password: password})
    } catch (error) {
      expect(error).toBeUndefined();
    }
  }); 

  it('should not login due to email inexistent', async() => {
    let email    : string = "testdoesnotexist@test.com";
    let password : string = "12345"
    try {
      await emailLogin.login("en", {email : email, password : password});
    } catch (error) {
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });

  it('should not login due to password being incorrect', async() => {
    let email    : string = "test2@test.com";
    let password : string = "123456"
    try {
      await emailLogin.login("en", { email : email, password: password})
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMismatchException);
    }
  });

  it('should not log in due to account unverified', async() => {
    let email    : string = "testnotverified@test.com";
    let password : string = "12345"
    try {
      await emailLogin.login("en", { email : email, password: password})
    } catch (error) {
      expect(error).toBeInstanceOf(AccountUnverifiedException);
    }
  }); 
});
