export interface DeletePrivacyRepo {
    deletePrivacy(lang : string, privacyId : string) : Promise<void>;
}
