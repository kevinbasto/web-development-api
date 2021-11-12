import { Module } from '@nestjs/common';
import { PrivacyReposModule } from './privacy-repos/privacy-repos.module';



@Module({
  imports: [PrivacyReposModule],
  exports: [PrivacyReposModule]
})
export class PublicReposModule {}
