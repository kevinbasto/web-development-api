import { PasswordCypherService } from '../../../../infra/tools/password-cypher/password-cypher.service';
import { TokenGeneratorService } from '../../../../infra/tools/token-generator/token-generator.service';
import { UuidGeneratorService } from '../../../../infra/tools/uuid-generator/uuid-generator.service';
import { MockCreateEmailAccount } from '../../../../testing/repos/accounts/mock-create-email-account';
import { MockFetchEmailAccount } from '../../../../testing/repos/accounts/mock-fetch-email-account';
import { MockCreateUser } from '../../../../testing/repos/users/mock-create-user';
import { EmailRegisterDto } from '../../../dto/auth/email-register-dto';
import { PasswordMismatchException } from '../../../exceptions/account/password-mismatch.exception';
import { AccountDuplicatedException } from '../../../exceptions/user/account-duplicated.exception';
import { EmailRegister } from './email.register';

const fetch = new MockFetchEmailAccount();
const passwordCypher = new PasswordCypherService();
const uuidGenerator = new UuidGeneratorService();
const tokenGenerator = new TokenGeneratorService();
const createEmail = new MockCreateEmailAccount();
const createUser = new MockCreateUser();

const registerData : EmailRegisterDto = {
  email : "test@test.com",
  password: "12345thinkaboutmatic",
  username: "Masahiro sakurai",
  verifyPassword: "12345thinkaboutmatic"
};

const emailRegister = new EmailRegister(fetch, passwordCypher, uuidGenerator, tokenGenerator, createEmail, createUser);

describe('Register', () => {
  it('should be defined', () => {
    expect(emailRegister).toBeDefined();
  });

  it('should create an account, register it and return the accountId', async () => {
    let newRegisterData : EmailRegisterDto = {...registerData}
    let lang : string =  "en";
    try {
      let accountId = await emailRegister.registerEmailAccount(lang, newRegisterData);
      expect(accountId).toBeDefined();
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });

  it('should reject the account creation because the email is already registered', async() => {
    let newRegisterData : EmailRegisterDto = {...registerData};
    newRegisterData.email = "test2@test.com";
    let lang : string = "en";
    try {
      await emailRegister.registerEmailAccount(lang, newRegisterData);
    } catch (error) {
      expect(error).toBeInstanceOf(AccountDuplicatedException);
    }
  });

  it('should reject the account creation because the passwords do not match', async () => {
    let newRegister : EmailRegisterDto = {...registerData};
    newRegister.verifyPassword = "this password should not match because i can";
    let lang : string = "en";
    try {
      await emailRegister.registerEmailAccount(lang, newRegister);
    } catch (error) {
      expect(error).toBeInstanceOf(PasswordMismatchException);
    }
  });
});
