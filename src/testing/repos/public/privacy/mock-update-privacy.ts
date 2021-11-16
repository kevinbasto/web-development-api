import { PrivacyDto } from "../../../../core/dto/public/privacy";
import { UpdatePrivacyRepo } from "../../../../core/repos/public/privacy/update-privacy-repo.interface";

export class MockUpdatePrivacy implements UpdatePrivacyRepo{
    updatePrivacyTerms(lang : string, privacyId : string, privacy : PrivacyDto) : Promise<void>{
        return;
    }
}
