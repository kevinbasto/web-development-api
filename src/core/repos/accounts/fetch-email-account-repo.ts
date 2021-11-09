export interface FetchEmailAccountRepo{
    FetchAccountByEmail(email : string) : Promise<any>;
}