export interface UsersRepo {
    createUser(name : string) : Promise<any>;
}