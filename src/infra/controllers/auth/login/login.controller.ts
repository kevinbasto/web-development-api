import { Body, Controller, Headers, Post } from '@nestjs/common';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    
    constructor(
        private loginService : LoginService
    ){}

    @Post('')
    emailLogin(@Body() loginData : EmailLoginDto, @Headers('Accept-Language') lang : string) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.loginService.loginWithEmailAndPassword(loginData, lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }
}
