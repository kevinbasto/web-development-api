import { Injectable } from '@nestjs/common';
import { UsersRepo } from '../../../core/repos/users.repo.interface';
import { DatabaseConnection } from '../databaseConnection';

@Injectable()
export class UsersRepoService extends DatabaseConnection implements UsersRepo {
    create() {}
    read() {}
    update() {}
    delete() {}
}
