import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'neo4j-driver-core';
import { CredentialsHandler } from '../../../core/ports/credentials-handler.interface';
import { AccountsRepo } from '../../../core/repos/accounts.repo.interface';
import { CREDENTIALS_HANDLER } from '../../services/services.token';
import { DatabaseConnection } from '../databaseConnection';


@Injectable()
export class AccountsRepoService implements AccountsRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler
    ) {}

    async createEmailAccount(email : string, password: string) : Promise<any> {
        const session : Session = await this.dbConnection.openWriteSession();
        let query : string = "CREATE(account:account { email : $email, password : $password })";
        let params = { email : email, password: password};
        await session.run(query, params);
        await session.close();
    }

    private get dbConnection(){
        return new DatabaseConnection(this.credentialsHandler);
    }
}
