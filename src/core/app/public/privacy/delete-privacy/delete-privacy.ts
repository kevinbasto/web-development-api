import { SystemMessage } from "../../../../dto/generic/system-message.dto";
import { PrivacyDto } from "../../../../dto/public/privacy";
import { PrivacyNoticeNotFoundException } from "../../../../exceptions/privacy/privacy-notice-not-found.exception";
import { Translater } from "../../../../ports/translater.interface";
import { DeletePrivacyRepo } from "../../../../repos/public/privacy/delete-privacy-repo.interface";
import { GetPrivacyRepo } from "../../../../repos/public/privacy/get-privacy-repo.interface";

export class DeletePrivacy {

    private lang : string;

    constructor(
        private getPrivacyRepo : GetPrivacyRepo,
        private deletePrivacyRepo : DeletePrivacyRepo,
        private translater : Translater
    ) {}

    async deletePrivacyNotice(privacyId : string, lang : string) : Promise<SystemMessage> {
        this.lang = lang;
        try {
            await this.checkForPrivacyNotice(privacyId);
            await this.deletePrivacyNoticeFromDatabase(privacyId);
        } catch (error) {
            throw error;
        }
        return await this.getMessage();
    }

    private async checkForPrivacyNotice(privacyId : string) : Promise<PrivacyDto>{
        try {
            let privacy = await this.getPrivacyRepo.getPrivacyById(this.lang, privacyId);
            if(!privacy)
                throw new PrivacyNoticeNotFoundException("", "");
            return privacy;
        } catch (error) {
            throw error;
        }
    }

    private async deletePrivacyNoticeFromDatabase(privacyId : string) : Promise<void> {
        try {
            await this.deletePrivacyRepo.deletePrivacy(this.lang, privacyId)
        } catch (error) {
            throw error;
        }
    }

    private async getMessage() : Promise<SystemMessage>{
        let name : string    = await this.translater.getTranslation(this.lang, "privacy.DELETE_NAME");
        let message : string = await this.translater.getTranslation(this.lang, "privacy.DELETE_MESSAGE");
        return {
            name: name,
            message: message
        }
    }
}
