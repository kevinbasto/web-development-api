export interface AccountsRepo {
    createEmailAccount(email : string, password : string, token : string) : Promise<any>;
    getAccountByEmail(email : string) : Promise<any>;
}
