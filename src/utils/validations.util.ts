import { Bot } from 'classes/bot.class';
import { Message } from 'discord.js';

export const isValidMessage = (message: Message, client: Bot): boolean => {
    const isValidPrefix = message.content.toLocaleLowerCase().startsWith(client.config.prefix);
    const isBot = message.author.bot;
    const isValidGuid = !!message.guild;

    return isValidPrefix && !isBot && isValidGuid;
}
