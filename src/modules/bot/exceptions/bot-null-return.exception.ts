import { reply } from '@bot/functions/communication.function';
import { Bot } from '@bot/classes/bot.class';
import { ExceptionContext } from '@core/interfaces/exception-context';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Message } from 'discord.js';
import { Exception } from '@core/classes/exception.class';


export class BotNullReturnException extends Exception {

    constructor(
        public method: string
    ) {
        super();

        this.method = method;
    }

    @UseAspect(Advice.After, LogExceptionAspect)
    async action(ctx: ExceptionContext<Bot>): Promise<void> {
        const message: Message = ctx.args[0];
        const content = `O método ${this.method} retornou um valor nulo.`;
        this.message = content;

        reply({ message }, { content });
    }
}
