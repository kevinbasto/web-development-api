import { Module } from '@nestjs/common';
import { CreatePrivacyController } from './create-privacy.controller';
import { CreatePrivacyService } from './create-privacy.service';

@Module({
  controllers: [CreatePrivacyController],
  providers: [CreatePrivacyService]
})
export class CreatePrivacyModule {}
