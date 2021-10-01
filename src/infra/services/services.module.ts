import { Module } from '@nestjs/common';
import { CredentialHandlerService } from './credential-handler/credential-handler.service';
import { EmailSenderService } from './email-sender/email-sender.service';
import { PasswordCypherService } from './password-cypher/password-cypher.service';
import { CREDENTIALS_HANDLER, EMAIL_SENDER, PASSWORD_CYPHER, SESSION_HANDLER, TOKEN_GENERATOR, TRANSLATER } from './services.token';
import { SessionHandlerService } from './session-handler/session-handler.service';
import { TokenGeneratorService } from './token-generator/token-generator.service';
import { TranslaterService } from './transtaler/transtaler.service';

@Module({
  providers: [
    {
      provide: CREDENTIALS_HANDLER,
      useClass: CredentialHandlerService
    },
    {
      provide: EMAIL_SENDER,
      useClass: EmailSenderService
    },
    {
      provide: PASSWORD_CYPHER,
      useClass: PasswordCypherService
    },
    {
      provide: SESSION_HANDLER,
      useClass: SessionHandlerService
    },
    {
      provide: TOKEN_GENERATOR,
      useClass: TokenGeneratorService
    },
    {
      provide: TRANSLATER,
      useClass: TranslaterService
    }
  ],
  exports: [
    {
      provide: CREDENTIALS_HANDLER,
      useClass: CredentialHandlerService
    },
    {
      provide: EMAIL_SENDER,
      useClass: EmailSenderService
    },
    {
      provide: PASSWORD_CYPHER,
      useClass: PasswordCypherService
    },
    {
      provide: SESSION_HANDLER,
      useClass: SessionHandlerService
    },
    {
      provide: TOKEN_GENERATOR,
      useClass: TokenGeneratorService
    },
    {
      provide: TRANSLATER,
      useClass: TranslaterService
    }
  ]
})
export class ServicesModule {}
