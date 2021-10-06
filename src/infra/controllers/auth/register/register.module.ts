import { Module } from '@nestjs/common';
import { ReposModule } from '../../../repos/repos.module';
import { ToolsModule } from '../../../tools/tools.module';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
  imports : [ ToolsModule, ReposModule ],
  controllers: [ RegisterController ],
  providers: [ RegisterService ]
})
export class RegisterModule {}
