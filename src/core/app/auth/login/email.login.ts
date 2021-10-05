import { EmailLoginDto } from "../../../dto/auth/email-login-dto";
import { SessionDto } from "../../../dto/auth/session-dto";
import { AccountUnverifiedException } from "../../../exceptions/account-unverified.exception";
import { DatabaseException } from "../../../exceptions/database.exception";
import { Exception } from "../../../exceptions/exception.interface";
import { PasswordMismatchException } from "../../../exceptions/password-mismatch";
import { UserNotFoundException } from "../../../exceptions/user-not-found";
import { PasswordCypher } from "../../../ports/password-cypher.interface";
import { SessionHandler } from "../../../ports/session-handler.interface";
import { Translater } from "../../../ports/translater.interface";
import { AccountsRepo } from "../../../repos/accounts.repo.interface";
import { EmailLoginMessages } from "./email.login.messages";

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
     * @param {EmailLoginDto} loginData
     * @param {String} lang 
     */
    async login(loginData : EmailLoginDto, lang : string) : Promise<SessionDto> {
        await this.validateData(loginData, lang).catch(err => {throw err});
        return this.sessionHandler.signSession( { email : loginData.email } );
    }

    private async validateData(loginData: EmailLoginDto, lang : string ) {
        let account : any = await this.accountsRepo.getAccountByEmail(loginData.email).catch(async() => { throw await this.getInternatServerErrorException(lang) });
        await this.checkIfUserExists(account, lang).catch( (exception : Exception) => {  throw exception.getException()});
        await this.checkPasswords(loginData.password, account.password, lang).catch( (exception : Exception) => { throw exception.getException()});
        await this.checkVerification(account, lang).catch( (exception : Exception) => { throw exception.getException()});
    }

    private async getInternatServerErrorException(lang : string){
        let name = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.DATABASE_ERROR_NAME}`)
        let message = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.DATABASE_ERROR_MESSAGE}`)
        return new DatabaseException(name, message).getException();
    }

    private async checkIfUserExists(account, lang : string){
        let name = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.NOT_FOUND_NAME}`);
        let message  = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.NOT_FOUND_MESSAGE}`);
        if(!account)
            throw new UserNotFoundException(name, message);
    }

    private async checkPasswords(password : string, hashedPassword : string, lang : string){
        let name = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.PASSWORD_MISSMATCH_NAME}`);
        let message  = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.PASSWORD_MISSMATCH_MESSAGE}`);
        if(!this.passwordCypher.verifyPassword(password, hashedPassword))
            throw new PasswordMismatchException(name, message);
    }

    private async checkVerification(account : any, lang : string){
        let name = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.UNVERIFIED_NAME}`);
        let message  = await this.translater.getTranslation(lang, `login.${EmailLoginMessages.UNVERIFIED_MESSAGE}`);
        if(!account.verified)
            throw new AccountUnverifiedException(name, message);
    }
}
