import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CredentialHandlerService } from './credential-handler/credential-handler.service';
import { EmailSenderService } from './email-sender/email-sender.service';
import { PasswordCypherService } from './password-cypher/password-cypher.service';
import { CREDENTIALS_HANDLER, EMAIL_SENDER, PASSWORD_CYPHER, SESSION_HANDLER, TOKEN_GENERATOR, TRANSLATER } from './services.token';
import { SessionHandlerService } from './session-handler/session-handler.service';
import { TokenGeneratorService } from './token-generator/token-generator.service';
import { TranslaterService } from './transtaler/transtaler.service';
import { jwtSecret } from './session-handler/jwtSecret';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as path from 'path';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret : jwtSecret,
      signOptions: { expiresIn: '60m' }
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
          path: path.join(__dirname, '../../i18n/'),
          watch: true
      },
  }),
  ],
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
    },
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
export class ToolsModule {}
