import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordController } from './change-password.controller';
import { ToolsModule } from '../../../tools/tools.module';
import { ReposModule } from '../../../repos/repos.module';

@Module({
  imports : [ToolsModule, ReposModule],
  providers: [ChangePasswordService],
  controllers: [ChangePasswordController]
})
export class ChangePasswordModule {}
