import { PrivacyDto } from "../../../dto/public/privacy";

export interface CreatePrivacyRepo {
    createPrivacyTerms( terms : PrivacyDto  ) : Promise<void>;
}
