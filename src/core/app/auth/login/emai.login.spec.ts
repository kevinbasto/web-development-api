import { Translater } from '../../../ports/translater.interface';
import { AccountsRepo } from '../../../repos/accounts.repo.interface';
import { EmailLogin } from './email.login';

class mockaccountsRepo implements AccountsRepo{
  async createEmailAccount(email : string, password : string) {}
}

class mocktranslater implements Translater{

}

const mockrepo = new mockaccountsRepo();
const mocktranslate = new mocktranslater();

describe('Login', () => {
  it('should be defined', () => {
    expect(new EmailLogin(mockrepo, mocktranslate)).toBeDefined();
  });
});
