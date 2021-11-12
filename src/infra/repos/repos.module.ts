import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { PublicReposModule } from './public/public-repos.module';


@Module({
  imports : [
    AccountsModule,
    UsersModule,
    PublicReposModule
  ],
  exports : [
    AccountsModule,
    UsersModule,
    PublicReposModule
  ],
})
export class ReposModule {}
