import { EmailAccount } from "../../../core/instances/auth/email-account";
import { FetchEmailAccountRepo } from "../../../core/repos/accounts/fetch-email-account-repo.interface";

export class MockFetchEmailAccount implements FetchEmailAccountRepo{

    private accounts : Array<EmailAccount> = [
        {
            accountId: "b73392bde89084745b623f99e885b76e453adf57784a2ed9286fb532aed175023341308838a5c34fa2ef94b9b5a7e1b51e9390b923dfb2ee7f72167a3c17457b",
            email: "test2@test.com",
            password : "$2b$10$IPYi9PiY2JfSpjQfwepY/.6AIqcHda/RTlO1NGpwWDerSiv8dwuna",
            isVerified: true,
            registerDate: 0,
        },
        {
            accountId: "95832d84599cb4fc72153b1514870dde91a66d2a409dedeb9600fc77bbe9f9fb61932b19314c2a24f3af0c5f857b32f79e1dafd07be9e8560663976a9a4cf858",
            email : "testnotverified@test.com",
            password: "$2b$10$IPYi9PiY2JfSpjQfwepY/.6AIqcHda/RTlO1NGpwWDerSiv8dwuna",
            isVerified: false,
            registerDate: 0
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
