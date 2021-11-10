import { Injectable } from '@nestjs/common';
import { EmailPasswordChangeDto } from '../../../../core/dto/auth/email-password-change-dto';
import { SystemMessage } from '../../../../core/dto/generic/system-message.dto';

@Injectable()
export class ChangePasswordService {

    constructor(){}

    changePassword(token : string, lang : string, changePassword : EmailPasswordChangeDto) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            
        });
    }
}
