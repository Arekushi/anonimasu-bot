import { Message } from 'discord.js';
import { reply } from '@bot/functions/communication.function';
import { Bot } from '@bot/classes/bot.class';
import { ExceptionContext } from '@core/interfaces/exception-context';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { Exception } from '@core/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class ArgumentMissingException extends Exception {

    constructor(
        argName: string
    ) {
        super();
        this.message = `O argumento - [${argName}] - É necessário!`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(ctx: ExceptionContext<Bot>): Promise<void> {
        const message: Message = ctx.args[0];
        reply({ message }, { content: this.message });
    }
}
