import { MessageOptions } from 'discord.js';

export abstract class BaseException extends Error {
    response: any;
    msg?: MessageOptions;

    constructor(response: any, msg?: MessageOptions) {
        super();
        this.response = response;
        this.msg = msg;
    }
}
