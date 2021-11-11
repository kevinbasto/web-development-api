import { Controller, Header, Headers, Param, Post } from '@nestjs/common';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {

    constructor(
        private verifyService : VerifyService
    ){}

    @Post(':token')
    verifyEmailAccount(@Param('token') token : string, @Headers('Accept-Language') lang : string) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.verifyService.verifyEmailUser(lang, token)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
