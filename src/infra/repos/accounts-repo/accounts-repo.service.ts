import { Injectable } from '@nestjs/common';
import { AccountsRepo } from '../../../core/repos/accounts.repo.interface';

@Injectable()
export class AccountsRepoService implements AccountsRepo{
    create() {}
    delete() {}
    read() {}
    update() {}
}
