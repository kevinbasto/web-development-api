import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CredentialHandlerService } from './credential-handler/credential-handler.service';
import { EmailSenderService } from './email-sender/email-sender.service';
import { PasswordCypherService } from './password-cypher/password-cypher.service';
import { CREDENTIALS_HANDLER, EMAIL_SENDER, PASSWORD_CYPHER, SESSION_HANDLER, TEMPLATE_LOADER, TOKEN_GENERATOR, TRANSLATER, UUID_GENERATOR } from './services.token';
import { SessionHandlerService } from './session-handler/session-handler.service';
import { TokenGeneratorService } from './token-generator/token-generator.service';
import { TranslaterService } from './transtaler/transtaler.service';
import { jwtSecret } from './session-handler/jwtSecret';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { TemplateLoaderService } from './template-loader/template-loader.service';
import { UuidGeneratorService } from './uuid-generator/uuid-generator.service';
import * as path from 'path';

const services : Provider<any>[] = [
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
  {
    provide: TEMPLATE_LOADER,
    useClass : TemplateLoaderService
  },
  {
    provide: UUID_GENERATOR,
    useClass : UuidGeneratorService
  }
]

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
          path: path.join(__dirname, '../../assets/i18n/'),
          watch: true
      },
  }),
  ],
  providers: services,
  exports: services
})
export class ToolsModule {}
