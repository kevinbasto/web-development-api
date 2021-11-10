import { EmailPasswordChangeDto } from "../../../dto/auth/email-password-change-dto";
import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { PasswordMismatchException } from "../../../exceptions/account/password-mismatch.exception";
import { AccountNotFoundException } from "../../../exceptions/user/user-not-found.exception";
import { EmailAccount } from "../../../instances/auth/email-account";
import { PasswordCypher } from "../../../ports/password-cypher.interface";
import { Translater } from "../../../ports/translater.interface";
import { FetchEmailAccountRepo } from "../../../repos/accounts/fetch-email-account-repo.interface";
import { UpdateEmailAccountRepo } from "../../../repos/accounts/update-email-account-repo.interface";

export class ChangePassword {

    private lang : string;

    constructor(
        private fetchEmailAccountRepo : FetchEmailAccountRepo,
        private passwordCypher : PasswordCypher,
        private updateEmailAccountRepo : UpdateEmailAccountRepo,
        private translater : Translater
    ){}

    async changePassword(lang : string, recoverToken : string, changePassword : EmailPasswordChangeDto) : Promise<SystemMessage> {
        this.lang = lang;
        return new Promise<SystemMessage>(async(resolve, reject) => {
            try {
                let account : EmailAccount = await this.fetchAccountByRecoverToken(recoverToken);
                this.checkPasswords(changePassword);
                account = await this.updatePassword(account, changePassword.password);
                this.updateAccount(account);
                resolve(await this.getSuccessMessage())
            } catch (error) {
                reject(error);
            }
        });
    }

    async fetchAccountByRecoverToken(token : string) : Promise<EmailAccount>{
        let account : EmailAccount;
        try {
            account = await this.fetchEmailAccountRepo.fetchAccountByRecoverToken(this.lang, token);
            if(!account)
                throw new AccountNotFoundException("", "");
        } catch (error) {
            throw error;
        }
        return account;
    }

    private checkPasswords(changePassword : EmailPasswordChangeDto){
        if(changePassword.password != changePassword.verifyPassword)
            throw new PasswordMismatchException("", "");
    }

    private async updatePassword(account : EmailAccount, password: string) : Promise<EmailAccount>{
        try {
            let hashedPassword = await this.passwordCypher.signPassword(password);
            account.password = hashedPassword;
            delete account.recoverToken;
            return account;
        } catch (error) {
            throw error;
        }
    }

    private async updateAccount(account : EmailAccount){
        try {
            this.updateEmailAccountRepo.updateEmailAccount(this.lang, account);
            return;
        } catch (error) {
            throw error;
        }
    }

    private async getSuccessMessage() : Promise<SystemMessage>{
        let name : string = await this.translater.getTranslation(this.lang, "changePassword.SUCCESSFUL_NAME");
        let message : string = await this.translater.getTranslation(this.lang, "changePassword.SUCCESSFUL_MESSAGE");
        return {
            name : name,
            message : message
        }
    }
}
