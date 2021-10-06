import { Module } from '@nestjs/common';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../tools/tools.module';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';

@Module({
  imports: [ReposModule, ToolsModule],
  controllers: [VerifyController],
  providers: [VerifyService]
})
export class VerifyModule {}
