import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { VerifyModule } from './verify/verify.module';

@Module({
  imports: [LoginModule, RegisterModule, VerifyModule]
})
export class AuthModule {}
