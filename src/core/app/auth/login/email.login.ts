import { EmailLoginDto } from "../../../dto/auth/email-login-dto";
import { SessionDto } from "../../../dto/auth/session-dto";
import { AccountUnverifiedException } from "../../../exceptions/account-unverified.exception";
import { Exception } from "../../../exceptions/exception.interface";
import { PasswordMismatchException } from "../../../exceptions/password-mismatch";
import { UserNotFoundException } from "../../../exceptions/user-not-found";
import { PasswordCypher } from "../../../ports/password-cypher.interface";
import { SessionHandler } from "../../../ports/session-handler.interface";
import { Translater } from "../../../ports/translater.interface";
import { AccountsRepo } from "../../../repos/accounts.repo.interface";

export class EmailLogin {

    constructor(
        private accountsRepo : AccountsRepo,
        private passwordCypher : PasswordCypher,
        private sessionHandler: SessionHandler,
        private translater : Translater,
    ){}

    /**
     * checks credentials then generates a session
     * @async
     * @method
     * @param {EmailLoginDto} loginData
     * @param {String} lang 
     */
    async login(loginData : EmailLoginDto, lang : string) : Promise<SessionDto> {
        this.validateData(loginData, lang).catch(err => {throw err});
        return this.sessionHandler.signSession( { email : loginData.email } );
    }

    private async validateData(loginData: EmailLoginDto, lang : string ) {
        let account : any = this.accountsRepo.getAccountByEmail(loginData.email);
        await this.checkIfUserExists(account).catch( (exception : Exception) => { throw exception.getException()});
        await this.checkPasswords(loginData.password, account.password).catch( (exception : Exception) => { throw exception.getException()});
        await this.checkVerification(account).catch( (exception : Exception) => { throw exception.getException()});
    }

    private async checkIfUserExists(account){
        if(account)
            throw new UserNotFoundException("", "");
    }

    private async checkPasswords(password : string, hashedPassword : string){
        if(this.passwordCypher.verifyPassword(password, hashedPassword))
            throw new PasswordMismatchException("", "");
    }

    private async checkVerification(account : any){
        if(!account.verified)
            throw new AccountUnverifiedException("", "");
    }
}
