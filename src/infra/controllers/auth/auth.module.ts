import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { VerifyModule } from './verify/verify.module';
import { RecoverModule } from './recover/recover.module';
import { ChangePasswordModule } from './change-password/change-password.module';

@Module({
  imports: [
    LoginModule,
    RegisterModule,
    VerifyModule,
    RecoverModule,
    ChangePasswordModule,
  ],
})
export class AuthModule {}
