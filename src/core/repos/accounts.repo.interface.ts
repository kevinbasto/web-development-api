export interface AccountsRepo {
    createEmailAccount(email : string, password : string) : Promise<any>;
}
