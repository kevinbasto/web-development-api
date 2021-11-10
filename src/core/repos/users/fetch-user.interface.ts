import { User } from "../../instances/auth/user";

export interface FetchUserRepo{
    fetchUserWithEmail(lang: string, email : string) : Promise<User>;
}