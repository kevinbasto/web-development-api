import { EmailAccount } from "../../../core/instances/auth/email-account";
import { UpdateEmailAccountRepo } from "../../../core/repos/accounts/update-email-account-repo.interface";

export class MockUpdateEmailAccount implements UpdateEmailAccountRepo {
    updateEmailAccount(lang : string, account : EmailAccount) : Promise<void> {
        return;
    }
}