import { Module } from '@nestjs/common';
import { ReposModule } from '../../../../repos/repos.module';
import { ToolsModule } from '../../../../tools/tools.module';
import { DeletePrivacyController } from './delete-privacy.controller';
import { DeletePrivacyService } from './delete-privacy.service';

@Module({
  imports : [ToolsModule, ReposModule],
  controllers: [DeletePrivacyController],
  providers: [DeletePrivacyService]
})
export class DeletePrivacyModule {}
