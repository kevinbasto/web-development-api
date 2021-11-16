import { Inject, Injectable } from '@nestjs/common';
import { GetPrivacy } from '../../../../../core/app/public/privacy/get-privacy/get-privacy';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { GetPrivacyRepo } from '../../../../../core/repos/public/privacy/get-privacy-repo.interface';
import { GET_PRIVACY_REPO_TOKEN } from '../../../../repos/public/privacy-repos/privacy-repos-tokens';

@Injectable()
export class GetPrivacyService {

    constructor(
        @Inject(GET_PRIVACY_REPO_TOKEN) private getPrivacyRepo : GetPrivacyRepo
    ){}

    getPrivacyPolicies( lang : string) : Promise<PrivacyDto>{
        return new Promise<PrivacyDto>((resolve, reject) => {
            this.privacy.getCurrentPrivacy(lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }

    FetchPrivacyPolicty( lang : string, privacyId : string ) : Promise<PrivacyDto>{
        return new Promise<PrivacyDto>((resolve, reject) => {
            this.privacy.getPrivacyPolicyById(lang, privacyId)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    get privacy(){
        return new GetPrivacy(this.getPrivacyRepo);
    }
}
