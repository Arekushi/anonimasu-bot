import { Message } from 'discord.js';


export const getMessageArgs = (
    prefix: string,
    message: Message
): string[] => {
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    return args;
};
