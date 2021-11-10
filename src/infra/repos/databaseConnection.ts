import neo4j, { Driver, Session } from "neo4j-driver";
import { driver, QueryResult } from "neo4j-driver-core";
import { CredentialsHandler } from "../../core/ports/credentials-handler.interface";
import { Translater } from "../../core/ports/translater.interface";

export class DatabaseConnection {

    constructor(
        private credentialsHandler : CredentialsHandler,
        private translater : Translater
    ){
        this.loadCredentials();
    }

    private scheme      : string;
    private host        : string;
    private port        : string;
    private user        : string;
    private password    : string;

    private loadCredentials(){
        this.scheme = this.credentialsHandler.loadCredential("scheme");
        this.host = this.credentialsHandler.loadCredential("host");
        this.port = this.credentialsHandler.loadCredential("port");
        this.user = this.credentialsHandler.loadCredential("user");
        this.password = this.credentialsHandler.loadCredential("password");
    }

    private async openConnection(lang  : string) : Promise<Driver>{
        let driverConnection = `${this.scheme}://${this.host}:${this.port}`;
        const driver = neo4j.driver(driverConnection, neo4j.auth.basic(this.user, this.password));
        await driver.verifyConnectivity().catch(error => { throw error });
        return driver;
    }

    private openWriteSession(connection : Driver, lang : string, database? : string) : Session{
        return connection.session({
            database: database,
            defaultAccessMode : neo4j.session.WRITE
        })
    }

    private openReadModeSession(connection : Driver, lang : string, database? : string) : Session{
        return connection.session({
            database : database,
            defaultAccessMode: neo4j.session.READ
        });
    }

    protected async executeWriteModeQuery(lang: string, query : string, params? : any) : Promise<QueryResult>{
        try {
            let connection : Driver = await this.openConnection(lang);
            let session = this.openWriteSession(connection, lang);
            let result : QueryResult = await session.run(query, params);
            await session.close();
            await connection.close();
            return result;
        } catch (error) {
            throw error;
        }
    }

    protected async executeReadModeQuery(lang : string, query : string, params? : any) : Promise<QueryResult>{
        try {
            let connection : Driver = await this.openConnection(lang);
            let session = this.openWriteSession(connection, lang);
            let result : QueryResult = await session.run(query, params);
            await session.close();
            await connection.close();
            return result;
        } catch (error) {
            throw error;
        }
    }
}
