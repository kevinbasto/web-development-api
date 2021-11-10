import { Inject, Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver-core';
import { User } from '../../../../core/instances/auth/user';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { FetchUserRepo } from '../../../../core/repos/users/fetch-user.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../tools/services.token';
import { DatabaseConnection } from '../../databaseConnection';

@Injectable()
export class FetchUserService extends DatabaseConnection implements FetchUserRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ){
        super(credentialsHandler, translater);
    }

    async fetchUserWithEmail(lang : string, email : string) : Promise<User>{
        try {
            let query = "match(account:account {email : $email})-[:belongs_to]->(user:user) return user;";
            let params = {email : email};
            let result : QueryResult = await this.executeReadModeQuery(lang, query, params)
            return result.records[0]? result.records[0].toObject().user.properties : null;
        } catch (error) {
            throw error;
        }
    }
}
