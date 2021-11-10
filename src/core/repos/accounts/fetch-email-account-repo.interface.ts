import { EmailAccount } from "../../instances/auth/email-account";

export interface FetchEmailAccountRepo{
    fetchAccountByEmail(lang : string, email : string) : Promise<EmailAccount>;
    fetchAccountByVerificationToken(lang: string, verificationToken : string) : Promise<EmailAccount>;
}