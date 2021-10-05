export interface AccountsRepo {
    createEmailAccount(email : string, password : string) : Promise<any>;
    getAccountByEmail(email : string) : Promise<any>;
}
