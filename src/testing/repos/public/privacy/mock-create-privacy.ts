import { PrivacyDto } from "../../../../core/dto/public/privacy";
import { CreatePrivacyRepo } from "../../../../core/repos/public/privacy/create-privacy-repo.interface";

export class MockCreatePrivacy implements CreatePrivacyRepo{
    createPrivacyTerms( lang : string, terms : PrivacyDto  ) : Promise<void>{
        return new Promise<void>((resolve, reject) => {
            resolve();
        })
    }
}
