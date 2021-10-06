import { Inject, Injectable } from '@nestjs/common';
import { EmailLogin } from '../../../../core/app/auth/login/email.login';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';
import { PasswordCypher } from '../../../../core/ports/password-cypher.interface';
import { SessionHandler } from '../../../../core/ports/session-handler.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { AccountsRepo } from '../../../../core/repos/accounts.repo.interface';
import { ACCOUNTS_REPO } from '../../../repos/repos.tokens';
import { PASSWORD_CYPHER, SESSION_HANDLER, TRANSLATER } from '../../../tools/services.token';

@Injectable()
export class LoginService {
  constructor(
    @Inject(ACCOUNTS_REPO) private accountsRepo : AccountsRepo,
    @Inject(PASSWORD_CYPHER) private passwordCypher : PasswordCypher,
    @Inject(SESSION_HANDLER) private sessionHandler : SessionHandler,
    @Inject(TRANSLATER) private translater : Translater,
    
  ) {}

  loginWithEmailAndPassword(loginData: EmailLoginDto, lang : string) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.emailLogin.login(loginData, lang)
      .then(res => resolve(res))
      .catch(error => reject(error));
    });
  }

  get emailLogin() {
    return new EmailLogin(this.accountsRepo, this.passwordCypher, this.sessionHandler, this.translater);
  }
}
