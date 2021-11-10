import { User } from "../../../core/instances/auth/user";
import { FetchUserRepo } from "../../../core/repos/users/fetch-user.interface";

export class MockFetcUser implements FetchUserRepo{
    private users : Array<User> = [
        {
            name: "test",
            userId: "testid",
            role : "staff"
        }
    ]

    private accounts : Array<any> = [
        {
            email : "test@test.com",
            name : "test"
        }
    ]

    async fetchUserWithEmail(lang: string, email : string) : Promise<User>{
        for(let account of this.accounts)
            if(account.email = email)
                return this.fetchUser(account.name);
    }

    private fetchUser(name : string) : User{
        for(let user of this.users)
            if(user.name == name)
                return user;
    }
}