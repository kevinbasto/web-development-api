import { Module } from '@nestjs/common';
import { ChangePasswordService } from './change-password.service';
import { ChangePasswordController } from './change-password.controller';

@Module({
  providers: [ChangePasswordService],
  controllers: [ChangePasswordController]
})
export class ChangePasswordModule {}
