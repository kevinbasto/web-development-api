import { Module } from '@nestjs/common';
import { ReposModule } from '../../../repos/repos.module';
import { ServicesModule } from '../../../services/services.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [ServicesModule, ReposModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
