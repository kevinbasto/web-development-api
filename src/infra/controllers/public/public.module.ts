import { Module } from '@nestjs/common';
import { PrivacyModule } from './privacy/privacy.module';



@Module({
  

  imports: [PrivacyModule]
})
export class PublicModule {}
