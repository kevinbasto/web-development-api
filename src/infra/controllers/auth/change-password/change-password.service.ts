import { Inject, Injectable } from '@nestjs/common';
import { ChangePassword } from '../../../../core/app/auth/change-password/change-password';
import { EmailPasswordChangeDto } from '../../../../core/dto/auth/email-password-change-dto';
import { SystemMessage } from '../../../../core/dto/generic/system-message.dto';
import { PasswordCypher } from '../../../../core/ports/password-cypher.interface';
import { Translater } from '../../../../core/ports/translater.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { UpdateEmailAccountRepo } from '../../../../core/repos/accounts/update-email-account-repo.interface';
import { FETCH_EMAIL_ACCOUNT_REPO_TOKEN, UPDATE_EMAIL_ACCOUNT_REPO_TOKEN } from '../../../repos/accounts/accounts.tokens';
import { PASSWORD_CYPHER, TRANSLATER } from '../../../tools/services.token';

@Injectable()
export class ChangePasswordService {

    constructor(
        @Inject(FETCH_EMAIL_ACCOUNT_REPO_TOKEN) private fetchEmailAccountRepo : FetchEmailAccountRepo,
        @Inject(PASSWORD_CYPHER) private passwordCypher : PasswordCypher,
        @Inject(UPDATE_EMAIL_ACCOUNT_REPO_TOKEN) private updateEmailAccountRepo : UpdateEmailAccountRepo,
        @Inject(TRANSLATER) private translater : Translater
    ){}

    updatePassword(token : string, lang : string, changePassword : EmailPasswordChangeDto) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            this.changePassword.changePassword(lang, token, changePassword)
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    get changePassword(){
        return new ChangePassword(this.fetchEmailAccountRepo, this.passwordCypher, this.updateEmailAccountRepo, this.translater);
    }
}
