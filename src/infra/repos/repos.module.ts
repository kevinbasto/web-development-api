import { Module } from '@nestjs/common';
import { ToolsModule } from '../tools/tools.module';


@Module({
  imports : [
    ToolsModule
  ],
  providers: [],
  exports : []
})
export class ReposModule {}
