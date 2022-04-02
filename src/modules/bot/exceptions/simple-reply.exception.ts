import { CommandContext } from '@bot/interfaces/command-context.interface';
import { Message } from 'discord.js';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { Exception } from '@core/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { reply } from '@bot/functions/communication.function';


export class ReplyUserException extends Exception {

    ctx: CommandContext;
    replyMessage: string;

    constructor(
        ctx: CommandContext,
        message: string
    ) {
        super();

        this.ctx = ctx;
        this.replyMessage = `[${ctx.author.username}] - ${message}`;
        this.message = `${this.replyMessage} - ${new Date().toTimeString()}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> {
        reply(this.ctx, { content: this.replyMessage });
    }
}
