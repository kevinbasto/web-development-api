import { Body, Controller, Post } from '@nestjs/common';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    
    constructor(
        private loginService : LoginService
    ){}

    @Post('')
    emailLogin(@Body() loginData : EmailLoginDto) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.loginService.loginWithEmailAndPassword(loginData)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }
}
