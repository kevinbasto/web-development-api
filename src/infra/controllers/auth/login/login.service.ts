import { Inject, Injectable } from '@nestjs/common';
import { EmailLogin } from '../../../../core/app/auth/login/email.login';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';
import { Translater } from '../../../../core/ports/translater.interface';
import { AccountsRepo } from '../../../../core/repos/accounts.repo.interface';
import { ACCOUNTS_REPO } from '../../../repos/repos.tokens';
import { TRANSLATER } from '../../../services/services.token';

@Injectable()
export class LoginService {
  constructor(
    @Inject(ACCOUNTS_REPO) private accountsRepo : AccountsRepo,
    @Inject(TRANSLATER) private translater : Translater
  ) {}

  loginWithEmailAndPassword(loginData: EmailLoginDto, lang : string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.emailLogin.login(loginData, lang)
      .then(res => resolve(res))
      .catch(error => reject(error));
    });
  }

  get emailLogin() {
    return new EmailLogin(this.accountsRepo, this.translater);
  }
}
