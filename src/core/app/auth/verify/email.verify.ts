import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { AccountNotFoundException } from "../../../exceptions/user/user-not-found.exception";
import { EmailAccount } from "../../../instances/auth/email-account";
import { Translater } from "../../../ports/translater.interface";
import { FetchEmailAccountRepo } from "../../../repos/accounts/fetch-email-account-repo.interface";
import { UpdateEmailAccountRepo } from "../../../repos/accounts/update-email-account-repo.interface";

export class Verify {

    private lang : string;

    constructor(
        private fetchEmailAccountRepo : FetchEmailAccountRepo,
        private translater : Translater,
        private updateEmailAccountRepo : UpdateEmailAccountRepo
    ){}

    verifyEmail(lang : string, token : string) : Promise<SystemMessage>{
        return new Promise<SystemMessage>(async(resolve, reject) => {
            this.lang = lang;
            let account : EmailAccount
            try {
                account = await this.fetchAccountByToken(token);
                account = this.verifyAccount(account);
                this.updateAccount(account);
                resolve(await this.getSuccessMessage());
            } catch (error) {
                reject(error);
            }
        })
    }

    private async fetchAccountByToken(token : string) : Promise<EmailAccount>{
        let account : EmailAccount;
        try {
            account = await this.fetchEmailAccountRepo.fetchAccountByVerificationToken(this.lang, token);
            if(!account)
                throw new AccountNotFoundException("account not found", "the account searched is not founded");
        } catch (error) {
            throw error
        }
        return account
    }

    private verifyAccount(account : EmailAccount) : EmailAccount {
        account.isVerified = true;
        delete account.verificationToken;
        return account;
    }

    private async updateAccount(account: EmailAccount) {
        try {
            await this.updateEmailAccountRepo.updateEmailAccount(this.lang, account);
            return;
        } catch (error) {
            throw error;
        }
    }

    private async getSuccessMessage() : Promise<SystemMessage>{
        let name : string = await this.translater.getTranslation(this.lang, "verification.VERIFIED_NAME");
        let message : string = await this.translater.getTranslation(this.lang, "verification.VERIFIED_MESSAGE");
        return {
            name : name,
            message : message
        }
    }
}
