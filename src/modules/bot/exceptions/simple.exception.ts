import { User } from 'discord.js';
import { LogExceptionAspect } from '@bot/aspects/log-exception.aspect';
import { Exception } from '@bot/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class SimpleException extends Exception {
    constructor(user: User, msg: string) {
        super();

        this.message = `[${user.username}] - ${msg} - ${new Date().toTimeString()}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> { }
}
