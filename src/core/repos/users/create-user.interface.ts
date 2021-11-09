export interface CreateUserRepo{
    createUser(lang : string, user : any, accountId : string) : Promise<void>;
}