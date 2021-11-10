import { EmailAccount } from "../../instances/auth/email-account";

export interface CreateEmailAccountRepo{
    createEmailAccount(lang : string, account : EmailAccount) : Promise<void>;
}