import { PrivacyDto } from "../../../../dto/public/privacy";
import { PrivacyNoticeNotFoundException } from "../../../../exceptions/privacy/privacy-notice-not-found.exception";
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

    async getPrivacyPolicyById(lang : string, privacyId : string) : Promise<PrivacyDto>{
        try {
            let privacyPolicies : PrivacyDto = await this.getPrivacyRepo.getPrivacyById(lang, privacyId);
            if(!privacyPolicies)
                throw new PrivacyNoticeNotFoundException("", "");
            return privacyPolicies;
        } catch (error) {
            throw error
        }
    }
}
