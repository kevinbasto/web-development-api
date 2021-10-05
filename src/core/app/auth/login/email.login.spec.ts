import { PasswordCypher } from '../../../ports/password-cypher.interface';
import { SessionHandler } from '../../../ports/session-handler.interface';
import { Translater } from '../../../ports/translater.interface';
import { AccountsRepo } from '../../../repos/accounts.repo.interface';
import { EmailLogin } from './email.login';

class mockaccountsRepo implements AccountsRepo{
  async createEmailAccount(email : string, password : string) {}
  async getAccountByEmail(email : string) {}
}

class mocktranslater implements Translater{
  async getTranslation(lang : string, message : string, params? : any) : Promise<string> {
    return "";
  }
}

class mockSessionHandler implements SessionHandler{
  decodeToken
  signSession
  verifySession
  verifyrefreshToken
}

class mockPasswordCypher implements PasswordCypher{
  signPassword
  verifyPassword
}

const mockrepo = new mockaccountsRepo();
const sessionHandler  = new mockSessionHandler();
const passwordCypher = new mockPasswordCypher();
const mocktranslate = new mocktranslater();


describe('Login', () => {
  it('should be defined', () => {
    expect(new EmailLogin(mockrepo,  passwordCypher, sessionHandler, mocktranslate)).toBeDefined();
  });
});
