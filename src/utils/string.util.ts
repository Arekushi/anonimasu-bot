import { glob } from 'glob';
import { promisify } from 'util';
import { Message } from 'discord.js';

export const getMessageArgs = (message: Message, prefix: string): string[] => {
    return message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
}

export const getFiles = async (thing: string): Promise<string[]> => {
    return await promisify(glob)(`${__dirname}/../${thing}/**/*{.ts,.js}`);
}
