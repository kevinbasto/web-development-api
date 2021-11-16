import { DeletePrivacyRepo } from "../../../../core/repos/public/privacy/delete-privacy-repo.interface";

export class MckDeletePrivacy implements DeletePrivacyRepo{
    deletePrivacy(lang : string, privacyId : string) : Promise<void>{
        return;
    }
}