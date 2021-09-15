import { Bot } from 'classes/bot.class';
import { Message } from 'discord.js';

export const isValidMessage = (client: Bot, message: Message): boolean => {
    const isValidPrefix = message.content.toLocaleLowerCase().startsWith(client.config.prefix);
    const isBot = message.author.bot;
    const isValidGuid = !!message.guild;

    return isValidPrefix && !isBot && isValidGuid;
}
