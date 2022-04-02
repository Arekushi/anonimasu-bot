import { Bot } from '@bot/classes/bot.class';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Exception } from '@core/classes/exception.class';
import { Command } from '@bot/classes/command.class';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { reply } from '@bot/functions/communication.function';


export class CooldownException extends Exception {

    command: Command<Bot>;
    ctx: CommandContext;

    constructor(
        command: Command<Bot>,
        ctx: CommandContext
    ) {
        super();

        this.command = command;
        this.ctx = ctx;
        this.message = `O usuário ${this.ctx.author.username} ` +
            `não pode usar o comando ${this.command.data.name} por enquanto. Aguarde.`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> {
        await reply(this.ctx, { content: this.message });
    }
}
