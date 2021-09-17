import { Bot } from 'classes/bot.class';
import { LogExceptionAspect } from 'aspects/log-exception.aspect';
import { UseAspect, Advice } from 'ts-aspect';
import { Exception } from "classes/exception.class";
import { Command } from "classes/command.class";

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
