import { Inject, Injectable } from '@nestjs/common';
import { EmailAccountRecover } from '../../../../core/app/auth/recover/email.recover';
import { SendRecoverEmail } from '../../../../core/app/auth/send-recover-email/send-recover-email';
import { EmailRecoverDto } from '../../../../core/dto/auth/email-recover-dto';
import { SystemMessage } from '../../../../core/dto/generic/system-message.dto';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { EmailSender } from '../../../../core/ports/email-sender.interface';
import { TemplateLoader } from '../../../../core/ports/template-loader.interface';
import { TokenGenerator } from '../../../../core/ports/token-generator.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { UpdateEmailAccountRepo } from '../../../../core/repos/accounts/update-email-account-repo.interface';
import { FETCH_EMAIL_ACCOUNT_REPO_TOKEN, UPDATE_EMAIL_ACCOUNT_REPO_TOKEN } from '../../../repos/accounts/accounts.tokens';
import { CREDENTIALS_HANDLER, EMAIL_SENDER, TEMPLATE_LOADER, TOKEN_GENERATOR, TRANSLATER } from '../../../tools/services.token';

@Injectable()
export class RecoverService {

    constructor(
        @Inject(FETCH_EMAIL_ACCOUNT_REPO_TOKEN) private fetchEmailAccountRepo : FetchEmailAccountRepo,
        @Inject(TOKEN_GENERATOR) private tokenGenerator : TokenGenerator,
        @Inject(UPDATE_EMAIL_ACCOUNT_REPO_TOKEN) private updateEmailAccountRepo : UpdateEmailAccountRepo,
        @Inject(TRANSLATER) private translater : Translater,
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler,
        @Inject(EMAIL_SENDER) private emailSender : EmailSender,
        @Inject(TEMPLATE_LOADER) private templateLoader : TemplateLoader
    ){}

    recoverWithEmailAndPassword(lang : string, emailRecoverDto : EmailRecoverDto) : Promise<any> {
        return new Promise<any>(async(resolve, reject) => {
            try {
                let recoverToken : string = await this.recover.GenerateRecoverToken(lang, emailRecoverDto.email);
                let message : SystemMessage = await this.sendRecoverEmail.sendRecoverEmail(lang, emailRecoverDto.email, recoverToken)
                resolve(message);
            } catch (error) {
                reject(error);
            }
        })
    }

    get recover(){
        return new EmailAccountRecover(this.fetchEmailAccountRepo, this.tokenGenerator, this.updateEmailAccountRepo);
    }

    get sendRecoverEmail(){
        return new SendRecoverEmail(this.translater, this.credentialsHandler, this.emailSender, this.templateLoader);
    }
}
