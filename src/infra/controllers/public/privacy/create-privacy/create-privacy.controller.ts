import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { CreatePrivacyService } from './create-privacy.service';

@ApiTags('privacy policies')
@Controller('privacy')
export class CreatePrivacyController {

    constructor(
        private createPrivacyService : CreatePrivacyService
    ) {}

    @Post('')
    public CreateNovel(@Body() privacyBody : PrivacyDto, @Headers('Accept-Language') lang : string ) : Promise<SystemMessage> {
        return new Promise<SystemMessage>((resolve, reject) => {
            this.createPrivacyService.publishPrivacy(lang, privacyBody)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
