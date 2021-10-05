import { Module } from '@nestjs/common';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../services/tools.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [ToolsModule, ReposModule],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
