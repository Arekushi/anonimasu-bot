import { Bot } from '@bot/classes/bot.class';
import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Message } from 'discord.js';
import { Exception } from '@bot/classes/exception.class';


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
