import { Inject, Injectable } from '@nestjs/common';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { CredentialsHandler } from '../../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../../core/ports/translater.interface';
import { UpdatePrivacyRepo } from '../../../../../core/repos/public/privacy/update-privacy-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../../tools/services.token';
import { DatabaseConnection } from '../../../databaseConnection';

@Injectable()
export class EditPrivacyRepoService extends DatabaseConnection implements UpdatePrivacyRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandeler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ) {
        super (credentialsHandeler, translater);
    }

    async updatePrivacyTerms(lang : string, privacyId : string, privacy : PrivacyDto) : Promise<void>{
        try {
            let query : string = "MATCH(privacy:privacy) WHERE privacy.privacyTermsId = $privacyId SET privacy = $privacy";
            let params = { privacyId : privacyId, privacy : privacy};
            await this.executeWriteModeQuery(lang, query, params)
        } catch (error) {
            throw error;
        }
    }
}
