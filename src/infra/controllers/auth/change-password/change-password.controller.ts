import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import { EmailPasswordChangeDto } from '../../../../core/dto/auth/email-password-change-dto';
import { SystemMessage } from '../../../../core/dto/generic/system-message.dto';
import { ChangePasswordService } from './change-password.service';

@Controller('change-password')
export class ChangePasswordController {
    
    constructor(
        private changePasswordService : ChangePasswordService
    ){}

    @Post(':token')
    changePassword(@Param('token') token : string, @Headers('Accept-Language') lang : string, @Body() passwordChange : EmailPasswordChangeDto) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            this.changePasswordService.changePassword(token, lang, passwordChange)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }
}
