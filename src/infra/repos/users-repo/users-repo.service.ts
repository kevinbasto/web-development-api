import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'neo4j-driver-core';
import { CredentialsHandler } from '../../../core/ports/credentials-handler.interface';
import { UsersRepo } from '../../../core/repos/users.repo.interface';
import { CREDENTIALS_HANDLER } from '../../tools/services.token';
import { DatabaseConnection } from '../databaseConnection';

@Injectable()
export class UsersRepoService implements UsersRepo {

    constructor(
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler
    ){ }

    async createUserWithEmailAccount(username : string){
        const session : Session = await this.dbConnector.openWriteSession();
        let query = "CREATE(user:user) set user.name = $name";
        let params = { name : username };
        await session.run(query, params);
        await session.close();
    }

    private get dbConnector(){
        return new DatabaseConnection(this.credentialsHandler);
    }
}
