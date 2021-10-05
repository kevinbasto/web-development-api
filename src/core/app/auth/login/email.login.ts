import { EmailLoginDto } from "../../../dto/auth/email-login-dto";
import { Translater } from "../../../ports/translater.interface";
import { AccountsRepo } from "../../../repos/accounts.repo.interface";

export class EmailLogin {

    constructor(
        private accountsRepo : AccountsRepo,
        private translater : Translater
    ){}

    async login(loginData : EmailLoginDto, lang : string) : Promise<any> {}
}
