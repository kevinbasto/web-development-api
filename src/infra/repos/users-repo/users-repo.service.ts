import { Inject, Injectable } from '@nestjs/common';
import { CredentialsHandler } from '../../../core/ports/credentials-handler.interface';
import { UsersRepo } from '../../../core/repos/users.repo.interface';
import { CREDENTIALS_HANDLER } from '../../services/services.token';
import { DatabaseConnection } from '../databaseConnection';

@Injectable()
export class UsersRepoService implements UsersRepo {

    constructor(
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler
    ){}

    create() {}
    read() {}
    update() {}
    delete() {}
}
