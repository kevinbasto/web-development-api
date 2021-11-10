import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../../core/instances/auth/user';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { CreateUserRepo } from '../../../../core/repos/users/create-user.interface';
import { CREDENTIALS_HANDLER, TRANSLATER } from '../../../tools/services.token';
import { DatabaseConnection } from '../../databaseConnection';

@Injectable()
export class CreateUserRepoService extends DatabaseConnection implements CreateUserRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) credentialsHandler : CredentialsHandler,
        @Inject(TRANSLATER) translater : Translater
    ){
        super(credentialsHandler, translater);
    }

    createUser(lang : string, user : User, accountId : string) : Promise<void> {
        return new Promise<void>(async(resolve, reject) => {
            try {
                await this.setUsersConstraints(lang);
                await this.storeUser(lang, user);
                await this.linkUserToAccount(lang, user.userId, accountId);
                resolve();
            } catch (error) {
                reject(error)
            }
        })
    }

    private async setUsersConstraints(lang : string){
        try {
            let accounts : number = await this.countUsers(lang);
            if(!accounts)
                await this.setUsersRestrictions(lang);
        } catch (error) {
            
        }
    }

    private async countUsers(lang : string) : Promise<number>{
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

    private async setUsersRestrictions(lang : string) : Promise<void>{
        let query : string = "CREATE CONSTRAINT ON (account:account) ASSERT account.accountId IS UNIQUE;"
        try {
            await this.executeWriteModeQuery(lang, query);
        } catch (error) {
            throw error;
        }
        return;
    }

    private async storeUser(lang : string, user : User) : Promise<void>{
        return new Promise<void>(async(resolve, reject) => {
            try {
                let query = "CREATE(user:user) set user = $user";
                let params = { user : user};
                await this.executeWriteModeQuery(lang, query, params);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

    private linkUserToAccount(lang : string, userId : string, accountId : string) : Promise<void>{
        return new Promise<void>(async(resolve, reject) => {
            try {
                let query  = "MATCH(user:user) WHERE user.userId = $userId MATCH(account:account) WHERE account.accountId = $accountId CREATE (account)-[:belongs_to]->(user);";
                let params = { userId : userId, accountId : accountId};
                await this.executeWriteModeQuery(lang, query, params);
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    }

}
