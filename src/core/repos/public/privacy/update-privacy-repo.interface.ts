import { PrivacyDto } from "../../../dto/public/privacy";

export interface UpdatePrivacyRepo {
    updatePrivacyTerms(lang : string, privacyId : string, privacy : PrivacyDto) : Promise<void>;
}
