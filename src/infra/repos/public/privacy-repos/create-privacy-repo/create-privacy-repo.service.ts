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
        try {
            let policiesCount : number | void = await this.setPrivacyConstratintsAndFetchCount(lang);
            if(policiesCount)
                await this.storeNewPrivacyNoticeEdition(lang, privacy);
            else
                await this.storeFirstPoliciesVersion(lang, privacy);
        } catch (error) {
            throw error
        }
    }

    private async setPrivacyConstratintsAndFetchCount( lang : string) : Promise<number | void>{
        try {
            let policies : number = await this.countPrivacyPolicies(lang);
            if(!policies)
                await this.setPrivacyRestrictions(lang);
            return policies;
        } catch (error) {
            throw error;
        }
    }

    private async countPrivacyPolicies(lang : string) : Promise<number>{
        let query : string = "MATCH(privacy:privacy) RETURN COUNT(privacy)";
        let count : number;
        try {
            let result = (await this.executeReadModeQuery(lang, query)).records[0].toObject();
            count = result['COUNT(privacy)'].low + result['COUNT(privacy)'].high;
        } catch (error) {
            throw error;
        }
        return count;
    }

    private async setPrivacyRestrictions(lang : string) : Promise<void>{
        let query : string = "CREATE CONSTRAINT ON (privacy:privacy) ASSERT privacy.privacyId IS UNIQUE;"
        try {
            await this.executeWriteModeQuery(lang, query);
        } catch (error) {
            throw error;
        }
    }

    private async storeNewPrivacyNoticeEdition(lang : string, privacy : PrivacyDto) : Promise<void>{
        let query : string = `MATCH(privacy:privacy:current) REMOVE privacy:current 
        CREATE(newPrivacy:privacy:current) SET newPrivacy = $privacy 
        CREATE(newPrivacy)-[:succedes]->(privacy)`;
        let params = { privacy : privacy};
        try {
            await this.executeWriteModeQuery(lang, query, params)
        } catch (error) {
            throw error;
        }
    }

    private async storeFirstPoliciesVersion(lang : string, privacy : PrivacyDto){
        let query : string = "CREATE(privacy:privacy:current) SET privacy = $privacy";
        let params = { privacy : privacy}
        try {
            await this.executeWriteModeQuery(lang, query, params);
        } catch (error) {
            throw error;
        }
    }
}
