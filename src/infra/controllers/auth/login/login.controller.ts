import { Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    
    constructor(
        private loginService : LoginService
    ){}

    @Post('')
    emailLogin() : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.loginService.loginWithEmailAndPassword()
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }
}
