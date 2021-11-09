import { Inject, Injectable } from '@nestjs/common';
import { EmailRegister } from '../../../../core/app/auth/register/email.register';
import { SendVerificationEmail } from '../../../../core/app/auth/send-verification-email/send-verification-email';
import { EmailRegisterDto } from '../../../../core/dto/auth/email-register-dto';
import { SystemMessage } from '../../../../core/dto/generic/system-message.dto';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { EmailSender } from '../../../../core/ports/email-sender.interface';
import { PasswordCypher } from '../../../../core/ports/password-cypher.interface';
import { TemplateLoader } from '../../../../core/ports/template-loader.interface';
import { TokenGenerator } from '../../../../core/ports/token-generator.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { UuidGenerator } from '../../../../core/ports/uuid-generator.interface';
import { CreateEmailAccountRepo } from '../../../../core/repos/accounts/create-email-account-repo.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { CreateUserRepo } from '../../../../core/repos/users/create-user.interface';
import { CREATE_EMAIL_ACCOUNT_REPO_TOKEN, FETCH_EMAIL_ACCOUNT_REPO_TOKEN } from '../../../repos/accounts/accounts.tokens';
import { CREATE_USER_REPO } from '../../../repos/users/users.token';
import { CREDENTIALS_HANDLER, EMAIL_SENDER, PASSWORD_CYPHER, TEMPLATE_LOADER, TOKEN_GENERATOR, TRANSLATER, UUID_GENERATOR } from '../../../tools/services.token';


@Injectable()
export class RegisterService {

    constructor(
        @Inject(FETCH_EMAIL_ACCOUNT_REPO_TOKEN) private fetchEmailAccountRepo : FetchEmailAccountRepo,
        @Inject(PASSWORD_CYPHER) private passwordCypher : PasswordCypher,
        @Inject(UUID_GENERATOR) private uuidGenerator : UuidGenerator,
        @Inject(TOKEN_GENERATOR) private tokenGenerator : TokenGenerator,
        @Inject(CREATE_EMAIL_ACCOUNT_REPO_TOKEN) private createEmailAccountRepo : CreateEmailAccountRepo,
        @Inject(CREATE_USER_REPO) private createUserRepo : CreateUserRepo,
        @Inject(TRANSLATER) private translater  : Translater,
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler,
        @Inject(EMAIL_SENDER) private emailSender : EmailSender,
        @Inject(TEMPLATE_LOADER) private templateLoader : TemplateLoader
    ) {}

    registerWithEmailAndPassword(registerData : EmailRegisterDto, lang : string) : Promise<SystemMessage>{
        return new Promise<any>(async(resolve, reject) => {
            try {
                let verificationToken : string = await this.emailRegister.registerEmailAccount(lang, registerData);
                let success : SystemMessage = await this.sendVerificationEmail.sendVerificationEmail(lang, registerData.email, verificationToken);
                resolve(success);
            } catch (error) {
                reject(error);
            }
        });
    }

    get emailRegister(){
        return new EmailRegister(
            this.fetchEmailAccountRepo,
            this.passwordCypher,
            this.uuidGenerator,
            this.tokenGenerator,
            this.createEmailAccountRepo,
            this.createUserRepo
        );
    }

    get sendVerificationEmail(){
        return new SendVerificationEmail(
            this.translater, 
            this.credentialsHandler, 
            this.emailSender, 
            this.templateLoader
        );
    }
}
