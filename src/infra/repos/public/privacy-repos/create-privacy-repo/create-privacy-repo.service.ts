import { Inject, Injectable } from '@nestjs/common';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { CredentialsHandler } from '../../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../../core/ports/translater.interface';
import { CreatePrivacyRepo } from '../../../../../core/repos/public/privacy/create-privacy-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../../tools/services.token';
import { DatabaseConnection } from '../../../databaseConnection';

@Injectable()
export class CreatePrivacyRepoService extends DatabaseConnection implements CreatePrivacyRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ){
        super(credentialsHandler, translater);
    }

    async createPrivacyTerms( lang : string, privacy : PrivacyDto  ) : Promise<void>{
        let query : string = "CREATE(privacy:privacy:current) set privacy = $privacy";
        let params = { privacy : privacy};
        try {
            await this.executeWriteModeQuery(lang, query, params);
            return;
        } catch (error) {
            throw error
        }
    }

}
