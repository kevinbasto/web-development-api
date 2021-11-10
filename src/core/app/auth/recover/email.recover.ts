import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { AccountNotFoundException } from "../../../exceptions/user/user-not-found.exception";
import { EmailAccount } from "../../../instances/auth/email-account";
import { TokenGenerator } from "../../../ports/token-generator.interface";
import { FetchEmailAccountRepo } from "../../../repos/accounts/fetch-email-account-repo.interface";
import { UpdateEmailAccountRepo } from "../../../repos/accounts/update-email-account-repo.interface";

export class EmailAccountRecover {

    private lang : string;

    constructor(
        private fetchEmailAccountRepo : FetchEmailAccountRepo,
        private tokenGenerator : TokenGenerator,
        private updateEmailAccount : UpdateEmailAccountRepo
    ){}

    async GenerateRecoverToken(lang : string, email : string) : Promise<string>{
        this.lang = lang;
        try {
            let account : EmailAccount = await this.checkAndFetchAccountWithEmail(email);
            account = this.generateRecoverToken(account);
            await this.storeTokenInDatabase(account);
            return account.recoverToken;
        } catch (error) {
            throw error;
        }
    }

    private async checkAndFetchAccountWithEmail(email : string) : Promise<EmailAccount>{
        let account : EmailAccount;
        try {
            account = await this.fetchEmailAccountRepo.fetchAccountByEmail(this.lang, email);
            if(!account)
                throw new AccountNotFoundException("", "");
            return account;
        } catch (error) {
            throw error;
        }
    }

    private generateRecoverToken(account : EmailAccount) : EmailAccount{
        account.recoverToken = this.tokenGenerator.generateToken();
        return account
    }

    private async storeTokenInDatabase(account : EmailAccount) {
        try {
            await this.updateEmailAccount.updateEmailAccount(this.lang, account);
            return;
        } catch (error) {
            throw error;
        }
    }
}
