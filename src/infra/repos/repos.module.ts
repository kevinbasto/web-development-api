import { Module } from '@nestjs/common';
import { ToolsModule } from '../tools/tools.module';
import { AccountsRepoService } from './accounts-repo/accounts-repo.service';
import { ACCOUNTS_REPO, USERS_REPO } from './repos.tokens';
import { UsersRepoService } from './users-repo/users-repo.service';

@Module({
  imports : [
    ToolsModule
  ],
  providers: [
    {
      provide: ACCOUNTS_REPO,
      useClass: AccountsRepoService
    },
    {
      provide: USERS_REPO,
      useClass: UsersRepoService
    }
  ],
  exports : [
    {
      provide: ACCOUNTS_REPO,
      useClass: AccountsRepoService
    },
    {
      provide: USERS_REPO,
      useClass: UsersRepoService
    }
  ]
})
export class ReposModule {}
