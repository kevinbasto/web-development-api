import { Inject, Injectable } from '@nestjs/common';
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

    createEmailAccount(email : string, password : string, token : string) : Promise<void>{
        return new Promise<void>((resolve, reject) => {
            try {
                
            } catch (error) {
                
            }
        })
    }
}
