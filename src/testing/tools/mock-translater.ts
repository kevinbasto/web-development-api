import { Translater } from "../../core/ports/translater.interface";

export class MockTranslater implements Translater{
    async getTranslation(lang : string, message : string, params : any) : Promise<string>{
        return message
    }
}