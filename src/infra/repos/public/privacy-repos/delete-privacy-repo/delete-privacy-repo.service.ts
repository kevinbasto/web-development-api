import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver-core';
import { PrivacyDto } from '../../../../../core/dto/public/privacy';
import { CredentialsHandler } from '../../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../../core/ports/translater.interface';
import { DeletePrivacyRepo } from '../../../../../core/repos/public/privacy/delete-privacy-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../../tools/services.token';
import { DatabaseConnection } from '../../../databaseConnection';

@Injectable()
export class DeletePrivacyRepoService extends DatabaseConnection implements DeletePrivacyRepo{

    private lang : string;

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ){
        super(credentialsHandler, translater);
    }

    async deletePrivacy(lang  : string, privacyId : string) : Promise<void>{
        this.lang = lang;
        try {
            let isCurrent : boolean = await this.checkIfPrivacyIsCurrent(privacyId);
            if(isCurrent)
                this.setNeighborToCurrent(privacyId);
            else
                this.eraseVersion(privacyId);
        } catch (error) {
            throw error;
        }
    }

    private async checkIfPrivacyIsCurrent(privacyId : string) : Promise<boolean>{
        let query = "MATCH(privacy:privacy:current) WHERE privacy.privacyTermsId = $privacyId";
        let params = { privacyId : privacyId };
        let terms : PrivacyDto;
        try {
            let result : QueryResult = await this.executeWriteModeQuery(this.lang, query, params);
            terms = result.records[0]?.toObject().privacy.properties;
            return !!terms;
        } catch (error) {
            throw error;
        }
    }

    private async setNeighborToCurrent(privacyId : string) : Promise<void>{
        if(await this.countPrivacy() <= 1)
            throw new UnauthorizedException({ 
                name : "operation unauthorized", 
                message :  "you must have at least one privacy notice for legal reasons"
            });
        let query : string = "MATCH(privacy:privacy:current)-[:succedes]->(olderPrivacy:privacy) DETACH DELETE privacy SET olderPrivacy:current";
        let params = { privacyId : privacyId };
        try {
            let count : number = await this.countPrivacy();
            if(count > 1)
                await this.executeWriteModeQuery(this.lang, query, params);
            else
                throw new UnauthorizedException({ name : "", message : ""});
        } catch (error) {
            throw error;
        }
    }

    private async countPrivacy() : Promise<number> {
        let versionsCount : number;
        let query : string = "MATCH(privacy:privacy) RETURN count(privacy)";
        try {
            let result : QueryResult = await this.executeReadModeQuery(this.lang, query);
            versionsCount = result.records[0].toObject()['COUNT(privacy)'].low + result.records[0].toObject()['COUNT(privacy)'].high;
            return versionsCount;
        } catch (error) {
            throw error;
        }
    } 

    private async eraseVersion(privacyId) : Promise<void>{
        let query : string = "MATCH(privacy:privacy) DETACH DELETE privacy;";
        let params = { privacyId : privacyId };
        try {
            await this.executeWriteModeQuery(this.lang, query, params);
        } catch (error) {
            throw error;
        }
    }
}
