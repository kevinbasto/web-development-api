import { SystemMessage } from "../../../dto/generic/system-message.dto";
import { PrivacyDto } from "../../../dto/public/privacy";
import { Translater } from "../../../ports/translater.interface";
import { UuidGenerator } from "../../../ports/uuid-generator.interface";
import { CreatePrivacyRepo } from "../../../repos/public/privacy/create-privacy-repo.interface";

export class CreatePrivacy {

    private lang : string

    constructor(
        private uuidGenerator : UuidGenerator,
        private createPrivacyRepo : CreatePrivacyRepo,
        private translater : Translater
    ){}

    async createPrivacyTerms( lang : string, privacy : PrivacyDto ) : Promise<SystemMessage>{
        this.lang = lang;
        try {
            privacy = this.setPrivacyId(privacy);
            await this.storePrivacyTerms(privacy);
            return await this.getSuccessMessage();
        } catch (error) {
            throw error;
        }
    }

    setPrivacyId( privacy : PrivacyDto){
        privacy.privacyTermsId = this.uuidGenerator.GenerateUuid(privacy);
        return privacy;
    }

    async storePrivacyTerms( privacy : PrivacyDto) : Promise<void> {
        try {
            await this.createPrivacyRepo.createPrivacyTerms(this.lang, privacy);
            return;
        } catch (error) {
            throw error;
        }
    }

    async getSuccessMessage() : Promise<SystemMessage>{
        let name : string = await this.translater.getTranslation(this.lang, "privacy.SUCCESS_NAME");
        let message :  string = await this.translater.getTranslation(this.lang, "privacy.SUCCESS_MESSAGE");
        return {
            name : name,
            message : message
        }
    }
}
