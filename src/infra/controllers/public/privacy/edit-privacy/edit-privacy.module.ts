import { Module } from '@nestjs/common';
import { EditPrivacyController } from './edit-privacy.controller';
import { EditPrivacyService } from './edit-privacy.service';

@Module({
  controllers: [EditPrivacyController],
  providers: [EditPrivacyService]
})
export class EditPrivacyModule {}
