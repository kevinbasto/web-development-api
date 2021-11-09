export interface createEmailAccountRepo{
    createEmailAccount(email : string, password : string, token : string) : Promise<void>;
}