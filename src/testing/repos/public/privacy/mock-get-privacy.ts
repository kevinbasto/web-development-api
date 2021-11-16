import { PrivacyDto } from "../../../../core/dto/public/privacy";
import { GetPrivacyRepo } from "../../../../core/repos/public/privacy/get-privacy-repo.interface";

export class MockGetPrivacy implements GetPrivacyRepo{

    async getCurrentTerms(lang : string) : Promise<PrivacyDto> {
        let privacy : PrivacyDto = {
            title : "Uso de datos",
            date: "jan 1, 2022",
            content: [
                "lorem ipsum dolor sit amet",
                "consectetur adipicising elit",
                "et quam ipsum anaero titilantus"
            ]
        };
        return privacy
    }

    async getPrivacyById(lang : string, privacyId : string) : Promise<PrivacyDto> {
        let privacy : PrivacyDto = {
            title : "Uso de datos",
            date: "jan 1, 2022",
            content: [
                "lorem ipsum dolor sit amet",
                "consectetur adipicising elit",
                "et quam ipsum anaero titilantus"
            ],
            privacyTermsId: "test"
        };
        if(privacyId = "test")
            return privacy;
    }
}
