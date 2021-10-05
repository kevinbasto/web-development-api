import { Inject, Injectable } from '@nestjs/common';
import { QueryResult, Session } from 'neo4j-driver-core';
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

    async getAccountByEmail(email : string) : Promise<any>{
        const session : Session = await this.dbConnection.openReadModeSession();
        let query : string = "match(account:account {email : $email}) return account;"
        let params = { email : email };
        let result : QueryResult = await session.run(query, params);
        return result.records[0]? result.records[0].toObject().account.properties : null;
    }

    private get dbConnection(){
        return new DatabaseConnection(this.credentialsHandler);
    }
}
