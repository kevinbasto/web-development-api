import { Controller, Delete, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { DeletePrivacyService } from './delete-privacy.service';

@ApiTags('privacy policies')
@Controller('privacy')
export class DeletePrivacyController {

    constructor(
        private deletePrivacyService : DeletePrivacyService
    ){}

    @Delete(':privacyTermsId')
    deletePrivacyNoticeEdition(@Param('privacyTermsId') privacyId : string, @Headers('Accept-Language') lang : string) : Promise<SystemMessage> {
        return new Promise<SystemMessage>((resolve, reject) => {
            this.deletePrivacyService.deletePrivacyTerms(privacyId, lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
