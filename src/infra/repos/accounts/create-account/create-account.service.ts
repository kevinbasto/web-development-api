import { Inject, Injectable } from '@nestjs/common';
import { QueryResult } from 'neo4j-driver-core';
import { EmailAccount } from '../../../../core/instances/auth/email-account';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { CreateEmailAccountRepo } from '../../../../core/repos/accounts/create-email-account-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../tools/services.token';
import { DatabaseConnection } from '../../databaseConnection';

@Injectable()
export class CreateAccountService extends DatabaseConnection implements CreateEmailAccountRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater: Translater
    ){
        super(credentialsHandler, translater);
    }

    createEmailAccount(lang : string, account : EmailAccount) : Promise<void>{
        return new Promise<void>(async(resolve, reject) => {
            try {
                await this.setAccountsConstraints(lang);
                await this.storeAccount(lang, account);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    private async setAccountsConstraints(lang : string){
        try {
            let accounts : number = await this.countAccounts(lang);
            if(!accounts)
                await this.setAccountsRestrictions(lang);
        } catch (error) {
            throw error;
        }
    }

    private async countAccounts(lang : string) : Promise<number>{
        let query : string  = "MATCH(account:account) RETURN COUNT(account)";
        let count : number;
        try {
            let result = (await this.executeReadModeQuery(lang, query)).records[0].toObject();
            count = result['count(account)'].low + result['count(account)'].high;
        } catch (error) {
            throw error;
        }
        return count;
    }

    private async setAccountsRestrictions(lang : string) : Promise<void>{
        let query : string = "CREATE CONSTRAINT ON (account:account) ASSERT account.accountId IS UNIQUE;"
        try {
            await this.executeWriteModeQuery(lang, query);
        } catch (error) {
            throw error;
        }
        return;
    }

    private async storeAccount(lang : string, account : EmailAccount) : Promise<void>{
        let query : string = "CREATE(account:account) SET account = $account";
        let params = { account : account};
        try {
            await this.executeWriteModeQuery(lang, query, params);
        } catch (error) {
            throw error;
        }
        return;
    }
}
