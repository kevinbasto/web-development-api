import { User } from "../../instances/auth/user";

export interface CreateUserRepo{
    createUser(lang : string, user : User, accountId : string) : Promise<void>;
}