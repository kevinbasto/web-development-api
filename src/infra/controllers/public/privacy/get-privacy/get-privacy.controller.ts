import { Controller, Get, Headers, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { GetPrivacyService } from './get-privacy.service';

@ApiTags('privacy policies')
@Controller('privacy')
export class GetPrivacyController {

    constructor(
        private getPrivacyService : GetPrivacyService
    ){}

    @Get('')
    public getPrivacyPolicies( @Headers('accept-language') lang : string) : Promise<PrivacyDto>{
        return new Promise<PrivacyDto>((resolve, reject) => {
            this.getPrivacyService.getPrivacyPolicies(lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    @Get(':privacyId')
    public getSpecificPrivacyPolicy( @Param('privacyId') privacyId : string, @Headers('accept-language') lang : string) : Promise<PrivacyDto>{
        return new Promise<PrivacyDto>((resolve, reject) => {
            this.getPrivacyService.FetchPrivacyPolicty(lang, privacyId)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }
}
