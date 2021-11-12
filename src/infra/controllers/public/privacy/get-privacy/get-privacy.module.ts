import { Module } from '@nestjs/common';
import { GetPrivacyController } from './get-privacy.controller';

@Module({
    controllers : [GetPrivacyController]
})
export class GetPrivacyModule {}
