import { SystemMessage } from "../../../../dto/generic/system-message.dto";
import { PrivacyDto } from "../../../../dto/public/privacy";
import { PrivacyNoticeNotFoundException } from "../../../../exceptions/privacy/privacy-notice-not-found.exception";
import { Translater } from "../../../../ports/translater.interface";
import { GetPrivacyRepo } from "../../../../repos/public/privacy/get-privacy-repo.interface";
import { UpdatePrivacyRepo } from "../../../../repos/public/privacy/update-privacy-repo.interface";

export class EditPrivacy {

    private lang : string;

    constructor(
        private getPrivacyRepo : GetPrivacyRepo,
        private updatePrivacyRepo : UpdatePrivacyRepo,
        private translater : Translater
    ){}

    public async editPrivacy( privacyId : string, privacy : PrivacyDto, lang : string) : Promise<SystemMessage>{
        this.lang = lang;
        try {
            let currentTerms : PrivacyDto = await this.fetchCurrentPrivacyTerms(privacyId);
            privacy = {...currentTerms, ...privacy};
            await this.updatePrivacyTerms(privacyId, privacy);
            console.log("object");
            return await this.getSuccessMessage();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private async fetchCurrentPrivacyTerms(privacyId : string) : Promise<PrivacyDto>{
        try {
            let currentTerms : PrivacyDto = await this.getPrivacyRepo.getPrivacyById(this.lang, privacyId)
            console.log(privacyId);
            if(!currentTerms)
                throw new PrivacyNoticeNotFoundException("not found", "the privacy notice edition you searched has not been founded");
            return currentTerms;
        } catch (error) {
            throw error;
        }
    }

    private async updatePrivacyTerms(privacyId : string, privacy : PrivacyDto) : Promise<void>{
        try {
            await this.updatePrivacyRepo.updatePrivacyTerms(this.lang, privacyId, privacy);
        } catch (error) {
            throw error;
        }
    }

    private async getSuccessMessage() : Promise<SystemMessage>{
        let name : string = await this.translater.getTranslation(this.lang, "privacy.UPDATE_NAME");
        let message : string = await this.translater.getTranslation(this.lang, "privacy.UPDATE_MESSAGE");
        return {
            name : name,
            message : message
        };
    }
}
