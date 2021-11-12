import { Module } from '@nestjs/common';
import { CreatePrivacyController } from './create-privacy.controller';

@Module({
  controllers: [CreatePrivacyController]
})
export class CreatePrivacyModule {}
