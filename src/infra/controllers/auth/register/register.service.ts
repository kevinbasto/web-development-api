import { Inject, Injectable } from '@nestjs/common';
import { EmailRegister } from '../../../../core/app/auth/register/email.register';
import { EmailRegisterDto } from '../../../../core/dto/auth/email-register-dto';
import { SystemMessage } from '../../../../core/dto/generic/system-message.dto';
import { PasswordCypher } from '../../../../core/ports/password-cypher.interface';
import { TokenGenerator } from '../../../../core/ports/token-generator.interface';
import { UuidGenerator } from '../../../../core/ports/uuid-generator.interface';
import { CreateEmailAccountRepo } from '../../../../core/repos/accounts/create-email-account-repo.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { CreateUserRepo } from '../../../../core/repos/users/create-user.interface';
import { CREATE_EMAIL_ACCOUNT_REPO_TOKEN, FETCH_EMAIL_ACCOUNT_REPO_TOKEN } from '../../../repos/accounts/accounts.tokens';
import { CREATE_USER_REPO } from '../../../repos/users/users.token';
import { PASSWORD_CYPHER, TOKEN_GENERATOR, UUID_GENERATOR } from '../../../tools/services.token';


@Injectable()
export class RegisterService {

    constructor(
        @Inject(FETCH_EMAIL_ACCOUNT_REPO_TOKEN) private fetchEmailAccountRepo : FetchEmailAccountRepo,
        @Inject(PASSWORD_CYPHER) private passwordCypher : PasswordCypher,
        @Inject(UUID_GENERATOR) private uuidGenerator : UuidGenerator,
        @Inject(TOKEN_GENERATOR) private tokenGenerator : TokenGenerator,
        @Inject(CREATE_EMAIL_ACCOUNT_REPO_TOKEN) private createEmailAccountRepo : CreateEmailAccountRepo,
        @Inject(CREATE_USER_REPO) private createUserRepo : CreateUserRepo
    ) {}

    registerWithEmailAndPassword(registerData : EmailRegisterDto, lang : string) : Promise<SystemMessage>{
        return new Promise<any>((resolve, reject) => {
            this.emailRegister.registerEmailAccount(lang, registerData)
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
        )
    }
}
