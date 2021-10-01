import neo4j, { Driver, Session } from "neo4j-driver";
import { CredentialsHandler } from "../../core/ports/credentials-handler.interface";

export class DatabaseConnection {

    constructor(
        private credentialsHandler : CredentialsHandler
    ){
        this.loadCredentials();
    }

    private scheme : string;
    private host : string;
    private port : string;
    private user : string;
    private password : string;

    private loadCredentials(){
        this.scheme = this.credentialsHandler.loadCredential("scheme");
        this.host = this.credentialsHandler.loadCredential("host");
        this.port = this.credentialsHandler.loadCredential("port");
        this.user = this.credentialsHandler.loadCredential("user");
        this.password = this.credentialsHandler.loadCredential("password");
    }

    private async openConnection() : Promise<Driver>{
        let driverConnection = `${this.scheme}://${this.host}:${this.port}`;
        const driver = neo4j.driver(driverConnection, neo4j.auth.basic(this.user, this.password));
        await driver.verifyConnectivity().catch(error => { throw error });
        return driver;
    }

    async openWriteSession(database? : string) : Promise<Session>{
        const driver = await this.openConnection().catch(error => { throw error });
        return driver.session({
            database: database,
            defaultAccessMode : neo4j.session.WRITE
        })
    }

    async openReadModeSession(database? : string) : Promise<Session>{
        const driver = await this.openConnection().catch(error => { throw error });
        return driver.session({
            database : database,
            defaultAccessMode: neo4j.session.READ
        });
    }
}
