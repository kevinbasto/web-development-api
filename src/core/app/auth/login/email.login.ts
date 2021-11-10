import { EmailLoginDto } from "../../../dto/auth/email-login-dto";
import { SessionDto } from "../../../dto/auth/session-dto";
import { AccountUnverifiedException } from "../../../exceptions/account/account-unverified.exception";
import { PasswordMismatchException } from "../../../exceptions/account/password-mismatch.exception";
import { AccountNotFoundException } from "../../../exceptions/user/user-not-found.exception";
import { EmailAccount } from "../../../instances/auth/email-account";
import { User } from "../../../instances/auth/user";
import { PasswordCypher } from "../../../ports/password-cypher.interface";
import { SessionHandler } from "../../../ports/session-handler.interface";
import { FetchEmailAccountRepo } from "../../../repos/accounts/fetch-email-account-repo.interface";
import { FetchUserRepo } from "../../../repos/users/fetch-user.interface";

export class EmailLogin {

    private lang : string;

    constructor(
        private fetchEmailaccountRepo : FetchEmailAccountRepo,
        private passwordCypher : PasswordCypher,
        private sessionGenerator : SessionHandler,
        private fetchUserRepo : FetchUserRepo
    ){}

    login(lang : string, loginData : EmailLoginDto) : Promise<SessionDto>{
        return new Promise<SessionDto>(async(resolve, reject) => {
            this.lang = lang;
            try {
                let account : EmailAccount = await this.fetchAccount(loginData.email);
                await this.checkPassword(loginData.password, account.password);
                await this.checkVerification(account.isVerified);
                resolve(await this.signSession(account));
            } catch (error) {
                reject(error);
            }
        });
    }

    private async fetchAccount(email : string) : Promise<EmailAccount>{
        let account : EmailAccount;
        account = await this.fetchEmailaccountRepo.fetchAccountByEmail(this.lang, email);
        if(!account)
            throw new AccountNotFoundException("", "");
        return account;
    }

    private async checkPassword(password : string, cypheredPassword : string){
        if(!this.passwordCypher.verifyPassword(password, cypheredPassword))
            throw new PasswordMismatchException("", "");
        return;
    }

    private async checkVerification(verified : boolean){
        if(!verified)
            throw new AccountUnverifiedException("", "");
    }

    private async signSession(account: EmailAccount) : Promise<SessionDto>{
        let user : User = await this.fetchUser(account.email);
        return this.sessionGenerator.signSession({
            email : account.email,
            name : user.name,
            role : user.role
        });
    }

    private async fetchUser(email : string): Promise<User>{
        let user = await this.fetchUserRepo.fetchUserWithEmail(this.lang, email);
        return user;
    }
}
