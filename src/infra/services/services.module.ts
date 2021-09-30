import { Module } from '@nestjs/common';
import { CredentialHandlerService } from './credential-handler/credential-handler.service';
import { EmailSenderService } from './email-sender/email-sender.service';
import { PasswordCypherService } from './password-cypher/password-cypher.service';
import { SessionHandlerService } from './session-handler/session-handler.service';
import { TokenGeneratorService } from './token-generator/token-generator.service';
import { TranstalerService } from './transtaler/transtaler.service';

@Module({
  providers: [
    CredentialHandlerService,
    EmailSenderService,
    PasswordCypherService,
    SessionHandlerService,
    TokenGeneratorService,
    TranstalerService
  ]
})
export class ServicesModule {}
