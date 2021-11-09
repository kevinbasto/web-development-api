export interface FetchEmailAccountRepo{
    fetchAccountByEmail(email : string) : Promise<any>;
}