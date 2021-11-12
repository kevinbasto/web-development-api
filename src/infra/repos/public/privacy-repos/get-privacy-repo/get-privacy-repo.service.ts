import { Inject, Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver-core';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { CredentialsHandler } from '../../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../../core/ports/translater.interface';
import { GetPrivacyRepo } from '../../../../../core/repos/public/privacy/get-privacy-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../../tools/services.token';
import { DatabaseConnection } from '../../../databaseConnection';

@Injectable()
export class GetPrivacyRepoService extends DatabaseConnection implements GetPrivacyRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ){
        super(credentialsHandler, translater);
    }

    async getCurrentTerms(lang : string) : Promise<PrivacyDto>{
        let query : string = "MATCH(privacy:privacy:current) return privacy;";
        let privacyPolicies : PrivacyDto;
        try {
            let result : QueryResult = await this.executeReadModeQuery(lang, query);
            privacyPolicies = result.records[0]? result.records[0].toObject().privacy.properties : null;
        } catch (error) {
            throw error;
        }
        return privacyPolicies;
    }
}
