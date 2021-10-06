import { EmailRegisterDto } from "../../../dto/auth/email-register-dto";
import { SystemMessageDto } from "../../../dto/system-message.dto";
import { DatabaseException } from "../../../exceptions/database.exception";
import { Exception } from "../../../exceptions/exception.interface";
import { UserDuplicatedException } from "../../../exceptions/user-duplicated.exception";
import { CredentialsHandler } from "../../../ports/credentials-handler.interface";
import { EmailSender } from "../../../ports/email-sender.interface";
import { PasswordCypher } from "../../../ports/password-cypher.interface";
import { TemplateLoader } from "../../../ports/template-loader.interface";
import { TokenGenerator } from "../../../ports/token-generator.interface";
import { Translater } from "../../../ports/translater.interface";
import { AccountsRepo } from "../../../repos/accounts.repo.interface";
import { UsersRepo } from "../../../repos/users.repo.interface";
import { EmailRegisterMessage } from "./email.register.messages";
import { SendVerificationEmail } from "./verification-email/send-verification-email";


export class EmailRegister {
    constructor(
        private accountsRepo : AccountsRepo,
        private usersRepo : UsersRepo,
        private tokenGenerator : TokenGenerator,
        private translater : Translater,
        private passwordCypher : PasswordCypher,
        private templateLoader : TemplateLoader,
        private emailSender : EmailSender,
        private credentialsHandler : CredentialsHandler
    ){}

    /**
     * will check if the email exists and if it's not then create the user and account and links them
     * @param registerData 
     * @param lang 
     * @returns {SystemMessageDto}
     */
    async register( registerData : EmailRegisterDto, lang : string ) : Promise<SystemMessageDto> {
        await this.validateAccount(registerData.email, lang).catch(error => { throw error });
        let token = await this.createAccountAndUser(registerData, lang).catch(error => { throw error });
        await this.sendVerificationEmail.sendEmail(token, registerData.email, lang).catch(error => { throw error });
        return await this.getSuccessMessage(lang);
    }

    private async validateAccount( email : string, lang : string ){
        let account = await this.accountsRepo.getAccountByEmail(email).catch(async() => { throw await this.getDatabaseErrorMessage(lang) });
        await this.validateAccountExists(account, lang).catch((error : Exception) => { throw error });
    }

    private async getDatabaseErrorMessage(lang : string){
        let name : string = await this.translater.getTranslation(lang, EmailRegisterMessage.DATABASE_EXCEPTION_NAME);
        let message : string = await this.translater.getTranslation(lang, EmailRegisterMessage.DATABASE_EXCEPTION_MESSAGE);
        return new DatabaseException(name, message).getException();
    }

    private async validateAccountExists(account : any, lang : string){
        let name : string = await this.translater.getTranslation(lang, EmailRegisterMessage.ACCOUNT_DUPLICATED_NAME);
        let message : string = await this.translater.getTranslation(lang, EmailRegisterMessage.ACCOUNT_DUPLICATED_MESSAGE);
        if(account)
            throw new UserDuplicatedException( name, message ).getException();
    }

    private async createAccountAndUser(registerData : EmailRegisterDto, lang : string) : Promise<string>{
        let token = this.tokenGenerator.generateToken();
        let password = await this.passwordCypher.signPassword(registerData.password);
        await this.accountsRepo.createEmailAccount( registerData.email, password, token).catch(async() => { throw await this.getDatabaseErrorMessage(lang)});
        await this.usersRepo.createUserWithEmailAccount(registerData.username, registerData.email).catch(async() => { throw await this.getDatabaseErrorMessage(lang)});
        return token;
    }

    private get sendVerificationEmail(){
        return new SendVerificationEmail(this.templateLoader, this.emailSender, this.translater, this.credentialsHandler);
    }    

    private async getSuccessMessage(lang : string) : Promise<SystemMessageDto>{
        let name : string = await this.translater.getTranslation(lang, EmailRegisterMessage.REGISTER_SUCCESS_NAME);
        let message : string = await this.translater.getTranslation(lang, EmailRegisterMessage.REGISTER_SUCCESS_MESSAGE);
        return {
            name : name,
            message : message
        }
    }
}
