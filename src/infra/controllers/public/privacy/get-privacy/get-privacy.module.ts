import { Module } from '@nestjs/common';
import { GetPrivacyController } from './get-privacy.controller';
import { GetPrivacyService } from './get-privacy.service';

@Module({
    controllers : [GetPrivacyController],
    providers: [GetPrivacyService]
})
export class GetPrivacyModule {}
