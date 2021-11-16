import { Module } from '@nestjs/common';
import { ReposModule } from '../../../../repos/repos.module';
import { ToolsModule } from '../../../../tools/tools.module';
import { GetPrivacyController } from './get-privacy.controller';
import { GetPrivacyService } from './get-privacy.service';

@Module({
    imports: [ToolsModule, ReposModule],
    controllers : [GetPrivacyController],
    providers: [GetPrivacyService]
})
export class GetPrivacyModule {}
