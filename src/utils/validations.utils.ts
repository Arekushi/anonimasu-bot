import { Command } from 'classes/command.class';
import { Message } from 'discord.js';

export const isValidMessage = (message: Message, prefix: string): boolean => {
    const isValidPrefix = message.content.toLocaleLowerCase().startsWith(prefix);
    const isBot = message.author.bot;
    const isValidGuid = !!message.guild;

    return isValidPrefix && !isBot && isValidGuid;
}

export const isValidCommand = (command: Command) => {
    const onCooldown = command.cooldownUsers.has(command.message.author.id);

    return !onCooldown
}
