import { Inject, Injectable } from '@nestjs/common';
import { EmailAccount } from '../../../../core/instances/auth/email-account';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { UpdateEmailAccountRepo } from '../../../../core/repos/accounts/update-email-account-repo.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../tools/services.token';
import { DatabaseConnection } from '../../databaseConnection';

@Injectable()
export class UpdateEmailAccountService extends DatabaseConnection implements UpdateEmailAccountRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler: CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ) {
        super(credentialsHandler, translater);
    }

    async updateEmailAccount(lang : string, account : EmailAccount) {
        let query : string = "MATCH(account:account) WHERE account.accountId = $accountId SET account = $account";
        let params = { accountId : account.accountId, account: account};
        try {
            await this.executeWriteModeQuery(lang, query, params)
            return;
        } catch (error) {
            throw error;
        }
    }
}
