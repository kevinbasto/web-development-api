import { Module } from '@nestjs/common';
import { DeletePrivacyController } from './delete-privacy.controller';

@Module({
  controllers: [DeletePrivacyController]
})
export class DeletePrivacyModule {}
