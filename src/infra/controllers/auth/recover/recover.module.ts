import { Module } from '@nestjs/common';
import { RecoverController } from './recover.controller';
import { RecoverService } from './recover.service';

@Module({
  controllers: [RecoverController],
  providers: [RecoverService]
})
export class RecoverModule {}
