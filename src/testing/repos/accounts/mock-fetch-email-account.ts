import { EmailAccount } from "../../../core/instances/auth/email-account";
import { FetchEmailAccountRepo } from "../../../core/repos/accounts/fetch-email-account-repo.interface";

export class MockFetchEmailAccount implements FetchEmailAccountRepo{

    private accounts : Array<EmailAccount> = [
        {
            accountId: "b73392bde89084745b623f99e885b76e453adf57784a2ed9286fb532aed175023341308838a5c34fa2ef94b9b5a7e1b51e9390b923dfb2ee7f72167a3c17457b",
            email: "test2@test.com",
            password : "12345",
            isVerified: false,
            registerDate: 0,
        }
    ]

    async fetchAccountByEmail(lang : string, email : string) : Promise<EmailAccount>{
        let fetchAccount : EmailAccount;
        for(let account of this.accounts){
            if(account.email == email)
                fetchAccount = account;
        }
        return fetchAccount? fetchAccount : null;
    }
}
