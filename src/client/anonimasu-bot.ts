import { Bot } from "./abstract-bot";

export class AnonimasuBot extends Bot {
    constructor() {
        super({
            intents: "DIRECT_MESSAGES"
        })
    }
}
