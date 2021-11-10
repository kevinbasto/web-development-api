import { Inject, Injectable } from '@nestjs/common';
import { EmailAccount } from '../../../../core/instances/auth/email-account';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../tools/services.token';
import { DatabaseConnection } from '../../databaseConnection';

@Injectable()
export class FetchEmailAccountService extends DatabaseConnection implements FetchEmailAccountRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ){
        super(credentialsHandler, translater);
    }

    async fetchAccountByEmail(lang : string, email : string) : Promise<EmailAccount>{
        let query : string = "MATCH(account:account) WHERE account.email = $email RETURN account"
        let params = { email : email };
        let account : any;
        try {
            let result = await this.executeReadModeQuery(lang, query, params);
            account = result.records[0]? result.records[0].toObject().account.properties : null;
        } catch (error) {
            throw error
        }
        return account;
    }

    async fetchAccountByVerificationToken(lang: string, verificationToken : string) : Promise<EmailAccount> {
        let account : EmailAccount
        let query : string = "MATCH(account:account) WHERE account.verificationToken = $verificationToken RETURN account;";
        let params = { verificationToken: verificationToken }
        try {
            let result = await this.executeReadModeQuery(lang, query, params);
            account = result.records[0]? result.records[0].toObject().account.properties : null;
        } catch (error) {
            throw error;
        }
        return account;
    }

    async fetchAccountByRecoverToken(lang: string, recoverToken : string) : Promise<EmailAccount> {
        let account : EmailAccount
        let query : string = "MATCH(account:account) WHERE account.recoverToken = $recoverToken RETURN account;";
        let params = { recoverToken: recoverToken }
        try {
            let result = await this.executeReadModeQuery(lang, query, params);
            account = result.records[0]? result.records[0].toObject().account.properties : null;
        } catch (error) {
            throw error;
        }
        return account;
    }
}
