import { EmailAccount } from "../../../core/instances/auth/email-account";
import { CreateEmailAccountRepo } from "../../../core/repos/accounts/create-email-account-repo.interface";

export class MockCreateEmailAccount implements CreateEmailAccountRepo{
    createEmailAccount(lang : string, account : EmailAccount) : Promise<void>{
        return new Promise((resolve, reject) => resolve());
    }
}
