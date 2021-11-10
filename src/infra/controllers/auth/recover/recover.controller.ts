import { Body, Controller, Headers, Post } from '@nestjs/common';
import e from 'express';
import { EmailRecoverDto } from '../../../../core/dto/auth/email-recover-dto';
import { RecoverService } from './recover.service';

@Controller('recover')
export class RecoverController {

    constructor(
        private recoverService : RecoverService
    ){}

    @Post('')
    recoverEmailAccount(@Headers('Accept-Language') lang : string, @Body() emailRecoverDto : EmailRecoverDto) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.recoverService.recoverWithEmailAndPassword(lang, emailRecoverDto)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
