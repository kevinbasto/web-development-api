import { Module } from '@nestjs/common';
import { AccountsRepoService } from './accounts-repo/accounts-repo.service';
import { UsersRepoService } from './users-repo/users-repo.service';

@Module({
  providers: [AccountsRepoService, UsersRepoService]
})
export class ReposModule {}
