import { Message, Client } from 'discord.js';
import { Category } from 'enums/category.enum';

export interface ICommand {
    name: string,
    category: Category,
    cooldownReply?: number;
    description?: string;
    aliases?: string[];
    message?: Message;
    cooldownToUse?: number;
}
