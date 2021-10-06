import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { EmailLoginDto } from '../../../../core/dto/auth/email-login-dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    
    constructor(
        private loginService : LoginService
    ){}

    @ApiCreatedResponse({
        description: "your session has been successfully generated and you can access now",
    })
    @ApiNotFoundResponse({
        description: "the account give is not on the database"
    })
    @ApiUnauthorizedResponse({
        description: "Either the request sent a wrong password or the account is unverified"
    })
    @ApiInternalServerErrorResponse({
        description: "there was a problem processing the request, it could be the database connection or the encryption library"
    })
    @Post('')
    emailLogin(@Body() loginData : EmailLoginDto, @Headers('Accept-Language') lang : string) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.loginService.loginWithEmailAndPassword(loginData, lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }
}
