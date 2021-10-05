export interface Translater {
    getTranslation(lang: string, message : string, args?: Object) : Promise<string>;
}
