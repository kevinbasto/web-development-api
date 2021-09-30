import { Controller, Post } from '@nestjs/common';
import { RecoverService } from './recover.service';

@Controller('recover')
export class RecoverController {

    constructor(
        private recoverService : RecoverService
    ){}

    @Post('')
    recoverEmailAccount() : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.recoverService.recoverWithEmailAndPassword()
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
