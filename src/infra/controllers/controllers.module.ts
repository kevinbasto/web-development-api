import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    AuthModule, 
    PublicModule
  ]
})
export class ControllersModule {}
