import { PrivacyDto } from "../../../../dto/public/privacy";
import { GetPrivacyRepo } from "../../../../repos/public/privacy/get-privacy-repo.interface";

export class GetPrivacy {

    constructor(
        private getPrivacyRepo : GetPrivacyRepo
    ){}

    async getCurrentPrivacy(lang : string) : Promise<PrivacyDto> {
        try {
            let privacyPolicies : PrivacyDto = await this.getPrivacyRepo.getCurrentTerms(lang);
            return privacyPolicies;
        } catch (error) {
            throw error
        }
    }
}
