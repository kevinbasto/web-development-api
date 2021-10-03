import { SessionHandler } from "../../../ports/session-handler.interface";

export class AuthStrategy {
    constructor(
        private sessionHandler : SessionHandler
    ){}

    async validate() {

    }
}
