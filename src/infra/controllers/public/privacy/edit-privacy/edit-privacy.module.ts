import { Module } from '@nestjs/common';
import { ReposModule } from '../../../../repos/repos.module';
import { ToolsModule } from '../../../../tools/tools.module';
import { EditPrivacyController } from './edit-privacy.controller';
import { EditPrivacyService } from './edit-privacy.service';

@Module({
  imports: [ToolsModule, ReposModule],
  controllers: [EditPrivacyController],
  providers: [EditPrivacyService]
})
export class EditPrivacyModule {}
