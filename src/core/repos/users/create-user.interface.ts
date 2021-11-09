export interface CreateUserRepo{
    createUser(user : any, accountId : string) : Promise<void>;
}