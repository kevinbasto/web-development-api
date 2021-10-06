import { Body, Controller, Headers, Post } from '@nestjs/common';
import { EmailRegisterDto } from '../../../../core/dto/auth/email-register-dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
    constructor(
        private registerService : RegisterService
    ) {}

    @Post('')
    registerWithEmailAndPassword(@Body() registerData : EmailRegisterDto, @Headers('Accept-Language') lang : string ) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.registerService.registerWithEmailAndPassword(registerData, lang)
            .then(res => resolve(res))
            .catch(err => {reject(err)});
        });
    }
}
