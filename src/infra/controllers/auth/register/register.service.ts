import { Inject, Injectable } from '@nestjs/common';
import { EmailRegister } from '../../../../core/app/auth/register/email.register';
import { EmailRegisterDto } from '../../../../core/dto/auth/email-register-dto';
import { SystemMessageDto } from '../../../../core/dto/generic/system-message.dto';


@Injectable()
export class RegisterService {

    constructor() {}

    registerWithEmailAndPassword(registerData : EmailRegisterDto, lang : string) : Promise<SystemMessageDto>{
        return new Promise<any>((resolve, reject) => {
            
        });
    }

}
