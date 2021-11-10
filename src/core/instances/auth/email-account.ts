export class EmailAccount {
    email : string;
    password : string;
    accountId : string;
    verificationToken? : string;
    isVerified? : boolean;
    registerDate? : number;
    recoverToken? : string;
}
