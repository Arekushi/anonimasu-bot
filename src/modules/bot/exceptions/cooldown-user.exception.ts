import { Bot } from '@bot/classes/bot.class';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Exception } from '@core/classes/exception.class';
import { Command } from '@bot/classes/command.class';


export class CooldownException extends Exception {
    command: Command<Bot>;

    constructor(command: Command<Bot>) {
        super();

        this.command = command;
        this.message = `O usuário ${this.command.message.author.username} ` +
            `não pode usar o comando ${this.command.name} por enquanto. Aguarde.`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> {
        await this.command.message.reply({ content: this.message });
    }
}
