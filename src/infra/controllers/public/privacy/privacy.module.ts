import { Module } from '@nestjs/common';
import { CreatePrivacyModule } from './create-privacy/create-privacy.module';
import { EditPrivacyModule } from './edit-privacy/edit-privacy.module';
import { GetPrivacyModule } from './get-privacy/get-privacy.module';
import { DeletePrivacyModule } from './delete-privacy/delete-privacy.module';

@Module({
  imports: [CreatePrivacyModule, EditPrivacyModule, GetPrivacyModule, DeletePrivacyModule],
})
export class PrivacyModule {}
