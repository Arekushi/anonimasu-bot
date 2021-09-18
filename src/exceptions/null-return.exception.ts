import { Bot } from 'classes/bot.class';
import { LogExceptionAspect } from 'aspects/log-exception.aspect';
import { UseAspect, Advice } from 'ts-aspect';
import { Message } from 'discord.js';
import { Exception } from "classes/exception.class";

export class NullReturnException extends Exception {
    method: string;

    constructor(method: string) {
        super();

        this.method = method;
    }

    @UseAspect(Advice.After, LogExceptionAspect)
    async action(client: Bot, message: Message): Promise<void> {
        const content = `O método ${this.method} retornou um valor nulo.`;

        this.message = content;
        message.reply({ content });
    }
}
