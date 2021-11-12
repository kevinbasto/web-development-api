import { Inject, Injectable } from '@nestjs/common';
import { CreatePrivacy } from '../../../../../core/app/public/privacy/create-privacy/create-privacy';
import { SystemMessage } from '../../../../../core/dto/generic/system-message.dto';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { Translater } from '../../../../../core/ports/translater.interface';
import { UuidGenerator } from '../../../../../core/ports/uuid-generator.interface';
import { CreatePrivacyRepo } from '../../../../../core/repos/public/privacy/create-privacy-repo.interface';
import { CREATE_PRIVACY_REPO_TOKEN } from '../../../../repos/public/privacy-repos/privacy-repos-tokens';
import { TRANSLATER, UUID_GENERATOR } from '../../../../tools/services.token';

@Injectable()
export class CreatePrivacyService {

    constructor(
        @Inject(UUID_GENERATOR) private uuid : UuidGenerator,
        @Inject(CREATE_PRIVACY_REPO_TOKEN) private createPrivacyRepo : CreatePrivacyRepo,
        @Inject(TRANSLATER) private translater : Translater
    ) {}

    public publishPrivacy(lang : string, privacy : PrivacyDto) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            this.createPrivacy.createPrivacyTerms(lang, privacy)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }

    get createPrivacy(){
        return new CreatePrivacy(this.uuid, this.createPrivacyRepo, this.translater);
    }
}
