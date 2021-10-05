import { Injectable } from '@nestjs/common';
import { EmailLogin } from '../../../../core/app/auth/login/email.login';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';

@Injectable()
export class LoginService {
  constructor() {}

  loginWithEmailAndPassword(loginData: EmailLoginDto): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.emailLogin.login(loginData);
    });
  }

  get emailLogin() {
    return new EmailLogin();
  }
}
