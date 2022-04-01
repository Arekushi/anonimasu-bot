import { Message } from 'discord.js';
import { Bot } from '@bot/classes/bot.class';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Exception } from '@core/classes/exception.class';
import { Command } from '@bot/classes/command.class';


export class CooldownException extends Exception {

    command: Command<Bot>;
    discordMessage: Message;

    constructor(
        command: Command<Bot>,
        message: Message
    ) {
        super();
        this.command = command;
        this.discordMessage = message;
        this.message = `O usuário ${this.discordMessage.author.username} ` +
            `não pode usar o comando ${this.command.data.name} por enquanto. Aguarde.`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> {
        await this.discordMessage.reply({ content: this.message });
    }
}
