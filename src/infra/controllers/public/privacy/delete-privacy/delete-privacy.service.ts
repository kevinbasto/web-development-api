import { Inject, Injectable } from '@nestjs/common';
import { DeletePrivacy } from '../../../../../core/app/public/privacy/delete-privacy/delete-privacy';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { Translater } from '../../../../../core/ports/translater.interface';
import { DeletePrivacyRepo } from '../../../../../core/repos/public/privacy/delete-privacy-repo.interface';
import { GetPrivacyRepo } from '../../../../../core/repos/public/privacy/get-privacy-repo.interface';
import { DELETE_PRIVACY_REPO_TOKEN, GET_PRIVACY_REPO_TOKEN } from '../../../../repos/public/privacy-repos/privacy-repos-tokens';
import { TRANSLATER } from '../../../../tools/services.token';

@Injectable()
export class DeletePrivacyService {

    constructor(
        @Inject(GET_PRIVACY_REPO_TOKEN) private getPrivacyRepo : GetPrivacyRepo,
        @Inject(DELETE_PRIVACY_REPO_TOKEN) private deletPrivateRepo : DeletePrivacyRepo,
        @Inject(TRANSLATER) private translater : Translater
    ) { }

    deletePrivacyTerms(privacyId : string, lang : string) : Promise<SystemMessage> {
        return new Promise<SystemMessage>((resolve, reject) => {
            this.deletePrivacy.deletePrivacyNotice(privacyId, lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    get deletePrivacy(){
        return new DeletePrivacy(this.getPrivacyRepo, this.deletPrivateRepo, this.translater);
    }
}
