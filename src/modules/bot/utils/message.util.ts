import { Message } from 'discord.js';
import { Bot } from '@bot/classes/bot.class';


export const getMessageArgs = (client: Bot, message: Message): string[] => {
    const args = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    return args;
};
