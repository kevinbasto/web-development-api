import { Module } from '@nestjs/common';
import { TermsModule } from './terms/terms.module';
import { PrivacyModule } from './privacy/privacy.module';

@Module({
  imports: [TermsModule, PrivacyModule]
})
export class PublicModule {}
