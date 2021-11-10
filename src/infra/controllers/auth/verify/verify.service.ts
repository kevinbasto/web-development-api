import { Inject, Injectable } from '@nestjs/common';
import { EmailVerify } from '../../../../core/app/auth/verify/email.verify';
import { Translater } from '../../../../core/ports/translater.interface';
import { FetchEmailAccountRepo } from '../../../../core/repos/accounts/fetch-email-account-repo.interface';
import { UpdateEmailAccountRepo } from '../../../../core/repos/accounts/update-email-account-repo.interface';
import { FETCH_EMAIL_ACCOUNT_REPO_TOKEN, UPDATE_EMAIL_ACCOUNT_REPO_TOKEN } from '../../../repos/accounts/accounts.tokens';
import { TRANSLATER } from '../../../tools/services.token';

@Injectable()
export class VerifyService {
    
    constructor(
        @Inject(FETCH_EMAIL_ACCOUNT_REPO_TOKEN) private fetchEmailAccountrepo : FetchEmailAccountRepo,
        @Inject(TRANSLATER) private translater : Translater,
        @Inject(UPDATE_EMAIL_ACCOUNT_REPO_TOKEN) private updateEmailAccountRepo : UpdateEmailAccountRepo,
    ){}

    verifyEmailUser(lang : string, token : string) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            this.emailVerify.verifyEmail(lang, token)
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }

    get emailVerify(){
        return new EmailVerify(this.fetchEmailAccountrepo, this.translater, this.updateEmailAccountRepo);
    }
}
