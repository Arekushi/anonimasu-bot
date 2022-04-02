import { SimpleException } from '@bot/exceptions/simple.exception';
import { Message, User } from 'discord.js';
import { Bot } from '@bot/classes/bot.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckMessageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const client: Bot = ctx.target.client;
        const message: Message = ctx.functionParams[0];
        const author = message.author;
        const prefix = client.config.prefix;

        if (!this.isValidAuthor(author, client)) {
            throw new SimpleException(
                author, 'Author inválido'
            );
        }

        if (!this.isValidPrefix(message, prefix)) {
            throw new SimpleException(
                author, 'Prefixo inválido'
            );
        }

        if (!this.isValidGuild(message)) {
            throw new SimpleException(
                author, 'GUILD é inválido'
            );
        }
    }

    isValidAuthor(author: User, client: Bot): boolean {
        return !author.bot && client.user.id !== author.id;
    }

    isValidPrefix(message: Message, prefix: string): boolean {
        return message.content.toLocaleLowerCase().trim().startsWith(prefix);
    }

    isValidGuild(message: Message): boolean {
        return !!message.guild;
    }
}
