import { EmailRegisterDto } from "../../../dto/auth/email-register-dto";
import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { PasswordMismatchException } from "../../../exceptions/account/password-mismatch.exception";
import { AccountDuplicatedException } from "../../../exceptions/user/account-duplicated.exception";
import { EmailAccount } from "../../../instances/auth/email-account";
import { User } from "../../../instances/auth/user";
import { PasswordCypher } from "../../../ports/password-cypher.interface";
import { TokenGenerator } from "../../../ports/token-generator.interface";
import { UuidGenerator } from "../../../ports/uuid-generator.interface";
import { CreateEmailAccountRepo } from "../../../repos/accounts/create-email-account-repo.interface";
import { FetchEmailAccountRepo } from "../../../repos/accounts/fetch-email-account-repo.interface";
import { CreateUserRepo } from "../../../repos/users/create-user.interface";

export class EmailRegister {
    
    private lang : string

    constructor(
        private FetchEmailAccountRepo : FetchEmailAccountRepo,
        private passwordCypher : PasswordCypher,
        private uuidGenerator : UuidGenerator,
        private tokenGenerator : TokenGenerator,
        private createEmailAccountRepo : CreateEmailAccountRepo,
        private createUserRepo : CreateUserRepo
    ){}

    async registerEmailAccount(lang : string, registerData : EmailRegisterDto) : Promise<string>{
        this.lang = lang;
        let account : EmailAccount;
        let user : User;
        try {
            await this.checkIfEmailAccountIsNotDuplicated(registerData.email);
            this.checkPasswordsMatch(registerData.password, registerData.verifyPassword);
            delete registerData.verifyPassword;
            registerData.password = await this.encryptPassword(registerData.password);
            account = this.createAccount(registerData);
            await this.storeAccount(account);
            user = this.createUser(registerData);
            await this.storeUser(user, account.accountId);
        } catch (error) {
            throw error;
        }
        return account.verificationToken;
    }

    private async checkIfEmailAccountIsNotDuplicated(email : string) : Promise<boolean>{
        let account = this.FetchEmailAccountRepo.fetchAccountByEmail(this.lang, email);
        if(!account)
            return true;
        else
            throw new AccountDuplicatedException("", "");
    }

    private checkPasswordsMatch(password : string, verifyPassword : string){
        if(password != verifyPassword)
            throw new PasswordMismatchException("", "")
    }

    private async encryptPassword(password : string) : Promise<string>{
        let encrypterPassword : string;
        try {
            encrypterPassword = await this.passwordCypher.signPassword(password);
        } catch (error) {
            throw error;
        }
        return encrypterPassword;
    }

    private createAccount(registerData : EmailRegisterDto) : EmailAccount{
        let account : EmailAccount = {
            email : registerData.email,
            accountId : "",
            password : registerData.password,
            verificationToken: this.tokenGenerator.generateToken(),
            isVerified : false,
            registerDate: Date.now()
        }
        account.accountId = this.uuidGenerator.GenerateUuid(JSON.stringify(account));
        return account;
    }

    private createUser(registerData : EmailRegisterDto) : User{
        let user : User = {
            name: registerData.username,
            userId : ""
        }
        user.userId = this.uuidGenerator.GenerateUuid(JSON.stringify(user));
        return user;
    }

    private async storeAccount(account: EmailAccount) : Promise<void>{
        try {
            await this.createEmailAccountRepo.createEmailAccount(this.lang, account)
        } catch (error) {
            throw error
        }
        return;
    }

    private async storeUser(user : User, accountId : string) : Promise<void>{
        try {
            this.createUserRepo.createUser(this.lang, user, accountId);
        } catch (error) {
            throw error
        }
        return;
    }
}
