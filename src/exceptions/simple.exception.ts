import { LogExceptionAspect } from 'aspects/log-exception.aspect';
import { User } from 'discord.js';
import { Exception } from "classes/exception.class";
import { UseAspect, Advice } from 'ts-aspect';

export class SimpleException extends Exception {
    constructor(user: User, msg: string) {
        super();

        this.message = `[${user.username}] - ${msg} - ${new Date().toTimeString()}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> { }
}
