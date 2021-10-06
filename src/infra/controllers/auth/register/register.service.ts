import { Inject, Injectable } from '@nestjs/common';
import { EmailRegister } from '../../../../core/app/auth/register/email.register';
import { EmailRegisterDto } from '../../../../core/dto/auth/email-register-dto';
import { SystemMessageDto } from '../../../../core/dto/system-message.dto';
import { CredentialsHandler } from '../../../../core/ports/credentials-handler.interface';
import { EmailSender } from '../../../../core/ports/email-sender.interface';
import { PasswordCypher } from '../../../../core/ports/password-cypher.interface';
import { TemplateLoader } from '../../../../core/ports/template-loader.interface';
import { TokenGenerator } from '../../../../core/ports/token-generator.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { AccountsRepo } from '../../../../core/repos/accounts.repo.interface';
import { UsersRepo } from '../../../../core/repos/users.repo.interface';
import { ACCOUNTS_REPO, USERS_REPO } from '../../../repos/repos.tokens';
import { CREDENTIALS_HANDLER, EMAIL_SENDER, PASSWORD_CYPHER, TEMPLATE_LOADER, TOKEN_GENERATOR, TRANSLATER } from '../../../tools/services.token';

@Injectable()
export class RegisterService {
    constructor(
        @Inject(ACCOUNTS_REPO) private accountsRepo : AccountsRepo,
        @Inject(USERS_REPO) private usersRepo : UsersRepo,
        @Inject(TOKEN_GENERATOR) private tokengenerator : TokenGenerator,
        @Inject(TRANSLATER) private translater : Translater,
        @Inject(PASSWORD_CYPHER) private passwordCypher : PasswordCypher,
        @Inject(TEMPLATE_LOADER) private templateLoader : TemplateLoader,
        @Inject(EMAIL_SENDER) private emailSender : EmailSender,
        @Inject(CREDENTIALS_HANDLER) private credentialsHandler : CredentialsHandler
    ) {}
    
    registerWithEmailAndPassword(registerData : EmailRegisterDto, lang : string) : Promise<SystemMessageDto>{
        return new Promise<any>((resolve, reject) => {
            this.emailRegister.register(registerData, lang)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    get emailRegister(){
        return new EmailRegister(
            this.accountsRepo, 
            this.usersRepo, 
            this.tokengenerator, 
            this.translater, 
            this.passwordCypher,
            this.templateLoader,
            this.emailSender,
            this.credentialsHandler
        );
    }
}
