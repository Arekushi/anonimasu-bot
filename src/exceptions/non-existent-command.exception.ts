import { Bot } from 'classes/bot.class';
import { LogExceptionAspect } from 'aspects/log-exception.aspect';
import { UseAspect, Advice } from 'ts-aspect';
import { Message } from 'discord.js';
import { Exception } from "classes/exception.class";

export class NonExistentCommandException extends Exception {
    constructor() {
        super();
    }

    @UseAspect(Advice.After, LogExceptionAspect)
    async action(client: Bot, message: Message): Promise<void> {
        const content = `Esse comando eu não conheço, o que quis dizer com: ${message.content}?`;

        this.message = content;
        message.reply({ content });
    }
}
