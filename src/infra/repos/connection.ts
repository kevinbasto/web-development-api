import neo4j, { Driver, Session } from "neo4j-driver";
import { CredentialsHandler } from "../../core/ports/credentials-handler.interface";

export class Connection {

    constructor(
        private credentialsHandler : CredentialsHandler
    ){}

    private scheme : string;
    private host : string;
    private port : string;
    private user : string;
    private password : string;

    private async openConnection() : Promise<Driver>{
        let driverConnection = `${this.scheme}://${this.host}:${this.port}`;
        const driver = neo4j.driver(driverConnection, neo4j.auth.basic(this.user, this.password));
        await driver.verifyConnectivity().catch(error => { throw error });
        return driver;
    }

    private async openWriteSession(database? : string) : Promise<Session>{
        const driver = await this.openConnection().catch(error => { throw error });
        return driver.session({
            database: database,
            defaultAccessMode : neo4j.session.WRITE
        })
    }

    private async openReadModeSession(database? : string) : Promise<Session>{
        const driver = await this.openConnection().catch(error => { throw error });
        return driver.session({
            database : database,
            defaultAccessMode: neo4j.session.READ
        });
    }
}
