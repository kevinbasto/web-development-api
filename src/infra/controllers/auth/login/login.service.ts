import { Inject, Injectable } from '@nestjs/common';
import { EmailLogin } from '../../../../core/app/auth/login/email.login';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';
import { SessionDto } from '../../../../core/dto/auth/session-dto';
import { PasswordCypher } from '../../../../core/ports/password-cypher.interface';
import { SessionHandler } from '../../../../core/ports/session-handler.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { FetchUserRepo } from '../../../../core/repos/users/fetch-user.interface';
import { FETCH_EMAIL_ACCOUNT_REPO_TOKEN } from '../../../repos/accounts/accounts.tokens';
import { FETCH_USER_REPO } from '../../../repos/users/users.token';
import { PASSWORD_CYPHER, SESSION_HANDLER } from '../../../tools/services.token';

@Injectable()
export class LoginService {
  constructor(
    @Inject(FETCH_EMAIL_ACCOUNT_REPO_TOKEN) private fetchEmailAccount : FetchEmailAccountRepo,
    @Inject(PASSWORD_CYPHER) private passwordCypher : PasswordCypher,
    @Inject(SESSION_HANDLER) private sessionGenerator : SessionHandler,
    @Inject(FETCH_USER_REPO) private fetchUserRepo : FetchUserRepo
  ) {}

  loginWithEmailAndPassword(loginData: EmailLoginDto, lang : string) : Promise<SessionDto> {
    return new Promise<any>((resolve, reject) => {
      this.emailLogin.login(lang, loginData)
      .then(session => resolve(session))
      .catch(error => reject(error));
    });
  }

  get emailLogin(){
    return new EmailLogin(this.fetchEmailAccount, this.passwordCypher, this.sessionGenerator, this.fetchUserRepo);
  }
}
