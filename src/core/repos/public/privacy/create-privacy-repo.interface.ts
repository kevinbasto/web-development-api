import { PrivacyDto } from "../../../dto/public/privacy";

export interface CreatePrivacyRepo {
    createPrivacyTerms( lang : string, terms : PrivacyDto  ) : Promise<void>;
}
