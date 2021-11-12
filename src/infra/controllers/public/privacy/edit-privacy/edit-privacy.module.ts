import { Module } from '@nestjs/common';
import { EditPrivacyController } from './edit-privacy.controller';

@Module({
  controllers: [EditPrivacyController]
})
export class EditPrivacyModule {}
