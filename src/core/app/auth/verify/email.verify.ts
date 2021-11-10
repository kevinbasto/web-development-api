import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { Translater } from "../../../ports/translater.interface";
import { FetchEmailAccountRepo } from "../../../repos/accounts/fetch-email-account-repo.interface";

export class Verify {

    constructor(
        private fetchEmailAccountRepo : FetchEmailAccountRepo,
        private translater : Translater
    ){}

    async verifyEmail(token : string) : Promise<SystemMessage>{
        return new Promise<SystemMessage>((resolve, reject) => {
            try {
                
            } catch (error) {
                reject(error);
            }
        })
    }
}
