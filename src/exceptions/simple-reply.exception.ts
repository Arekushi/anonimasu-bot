import { Message } from 'discord.js';
import { LogExceptionAspect } from 'aspects/log-exception.aspect';
import { Exception } from "classes/exception.class";
import { UseAspect, Advice } from 'ts-aspect';

export class ReplyUserException extends Exception {
    discordMessage: Message;
    replyMessage: string;

    constructor(message: Message, msg: string) {
        super();

        this.discordMessage = message;
        this.replyMessage = `[${message.author.username}] - ${msg}`;
        this.message = `${this.replyMessage} - ${new Date().toTimeString()}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> {
        this.discordMessage.reply({
            content: this.replyMessage
        });
    }
}