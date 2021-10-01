import { Inject, Injectable } from '@nestjs/common';
import { CredentialsHandler } from '../../../core/ports/credentials-handler.interface';
import { AccountsRepo } from '../../../core/repos/accounts.repo.interface';
import { CREDENTIALS_HANDLER } from '../../services/services.token';
import { DatabaseConnection } from '../databaseConnection';

@Injectable()
export class AccountsRepoService implements AccountsRepo{

    constructor(
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler
    ){}

    create() {}
    delete() {}
    read() {}
    update() {}
}
