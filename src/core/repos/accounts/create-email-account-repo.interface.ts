export interface CreateEmailAccountRepo{
    createEmailAccount(email : string, password : string, token : string) : Promise<void>;
}