import { CommandContext } from '@bot/interfaces/command-context.interface';
import { reply } from '@bot/functions/communication.function';
import { ExceptionContext } from '@core/interfaces/exception-context';
import { Bot } from '@bot/classes/bot.class';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Message } from 'discord.js';
import { Exception } from '@core/classes/exception.class';


export class NonExistentCommandException extends Exception {

    constructor() {
        super();
    }

    @UseAspect(Advice.After, LogExceptionAspect)
    async action(ctx: ExceptionContext<Bot>): Promise<void> {
        const cmdCtx: CommandContext = ctx.args[0];
        const message: Message = cmdCtx.message;
        const content = `Esse comando eu não conheço, o que quis dizer com: [${message.content}]?`;
        this.message = content;

        reply(cmdCtx, { content });
    }
}
