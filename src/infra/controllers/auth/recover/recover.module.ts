import { Module } from '@nestjs/common';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../tools/tools.module';
import { RecoverController } from './recover.controller';
import { RecoverService } from './recover.service';

@Module({
  imports: [ToolsModule, ReposModule],
  controllers: [RecoverController],
  providers: [RecoverService]
})
export class RecoverModule {}
