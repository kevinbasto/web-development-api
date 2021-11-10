import { User } from "../../../core/instances/auth/user";
import { CreateUserRepo } from "../../../core/repos/users/create-user.interface";

export class MockCreateUser implements CreateUserRepo{
    createUser(lang : string, user : User, accountId : string) : Promise<void>{
        return new Promise((resolve, reject) => resolve());
    }
}
