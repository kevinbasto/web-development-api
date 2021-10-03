export interface PasswordCypher {
    signPassword(password : string) : Promise<string>;
    verifyPassword(password : string, hashedPassword : string) : boolean;
}
