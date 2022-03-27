import { SimpleException } from '@bot/exceptions/simple.exception';
import { Message } from 'discord.js';
import { Bot } from '@bot/classes/bot.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckMessageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const client: Bot = ctx.functionParams[0];
        const message: Message = ctx.functionParams[1];
        const author = message.author;
        const prefix = client.config.prefix;

        if (!author.bot && client.user.id !== author.id) {
            const isValidGuild = !!message.guild;
            const isValidPrefix = message.content.toLocaleLowerCase().trim().startsWith(prefix);

            if (!isValidPrefix) {
                throw new SimpleException(
                    author, 'Prefixo inválido'
                );
            }

            if (!isValidGuild) {
                throw new SimpleException(
                    author, 'GUILD é inválido'
                );
            }
        } else {
            throw { };
        }
    }
}
