import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';


@Module({
  imports : [
    AccountsModule,
    UsersModule
  ],
  exports : [
    AccountsModule,
    UsersModule
  ],
})
export class ReposModule {}
