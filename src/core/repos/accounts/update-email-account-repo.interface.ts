import { EmailAccount } from "../../instances/auth/email-account";

export interface UpdateEmailAccountRepo {
    updateEmailAccount(lang : string, account : EmailAccount) : Promise<void>;
}
