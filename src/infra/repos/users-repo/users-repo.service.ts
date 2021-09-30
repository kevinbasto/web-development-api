import { Injectable } from '@nestjs/common';
import { UsersRepo } from '../../../core/repos/users.repo.interface';

@Injectable()
export class UsersRepoService implements UsersRepo {
    create() {}
    read() {}
    update() {}
    delete() {}
}
