import { Body, Controller, Headers, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { EditPrivacyService } from './edit-privacy.service';

@ApiTags('privacy policies')
@Controller('privacy')
export class EditPrivacyController {

    constructor(
        private editPrivacy : EditPrivacyService
    ){}

    @Patch(':privacyTermsId')
    editPrivacyContent(@Param("privacyTermsId") privacyId : string, @Body() editPrivacy : PrivacyDto, @Headers('Accept-Language') lang : string) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            this.editPrivacy.editPrivacyTerm(privacyId, editPrivacy, lang)
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
    }
}
