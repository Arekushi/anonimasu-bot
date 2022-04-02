import { User } from 'discord.js';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { Exception } from '@core/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class SimpleException extends Exception {

    constructor(
        user: User,
        message: string
    ) {
        super();
        this.message = `[${user.username}] - ${message} - ${new Date().toTimeString()}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> { }
}
