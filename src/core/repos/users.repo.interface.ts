export interface UsersRepo {
    createUserWithEmailAccount(name : string, email : string) : Promise<any>;
}