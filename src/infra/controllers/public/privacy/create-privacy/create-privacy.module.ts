import { Module } from '@nestjs/common';
import { ReposModule } from '../../../../repos/repos.module';
import { ToolsModule } from '../../../../tools/tools.module';
import { CreatePrivacyController } from './create-privacy.controller';
import { CreatePrivacyService } from './create-privacy.service';

@Module({
  imports: [ToolsModule, ReposModule],
  controllers: [CreatePrivacyController],
  providers: [CreatePrivacyService]
})
export class CreatePrivacyModule {}
