import { Bot } from '@bot/classes/bot.class';


export abstract class Exception extends Error {
    constructor() {
        super();
    }

    abstract action(client: Bot, ...args: any[]): Promise<void>;
}