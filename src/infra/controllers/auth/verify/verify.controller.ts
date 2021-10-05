import { Controller, Post } from '@nestjs/common';
import { VerifyService } from './verify.service';

@Controller('verify')
export class VerifyController {

    constructor(
        private verifyService : VerifyService
    ){}

    @Post('')
    verifyEmailAccount() : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.verifyService.verifyEmailUser()
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
