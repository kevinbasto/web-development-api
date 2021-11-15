import { Inject, Injectable } from '@nestjs/common';
import { EditPrivacy } from '../../../../../core/app/public/privacy/edit-privacy/edit-privacy';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { Translater } from '../../../../../core/ports/translater.interface';
import { GetPrivacyRepo } from '../../../../../core/repos/public/privacy/get-privacy-repo.interface';
import { UpdatePrivacyRepo } from '../../../../../core/repos/public/privacy/update-privacy-repo.interface';
import { GET_PRIVACY_REPO_TOKEN, UPDATE_PRIVACY_REPO_TOKEN } from '../../../../repos/public/privacy-repos/privacy-repos-tokens';
import { TRANSLATER } from '../../../../tools/services.token';

@Injectable()
export class EditPrivacyService {

    constructor(
        @Inject(GET_PRIVACY_REPO_TOKEN) private getPrivacyRepo : GetPrivacyRepo,
        @Inject(UPDATE_PRIVACY_REPO_TOKEN) private updatePrivacyRepo : UpdatePrivacyRepo,
        @Inject(TRANSLATER) private translater : Translater
    ){}

    async editPrivacyTerm(privacyId : string, privacy : PrivacyDto, lang : string) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            this.updatePrivacy.editPrivacy(privacyId, privacy, lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    get updatePrivacy(){
        return new EditPrivacy(this.getPrivacyRepo, this.updatePrivacyRepo, this.translater);
    }
}
