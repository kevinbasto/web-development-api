import { PrivacyDto } from "../../../dto/public/privacy";

export interface GetPrivacyRepo {
    getCurrentTerms(lang : string) : Promise<PrivacyDto>;
}
