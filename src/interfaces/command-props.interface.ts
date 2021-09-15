import { Message } from 'discord.js';
import { Category } from 'enums/category.enum';

export interface CommandProps {
    name: string;
    category: Category;
    cooldownReply?: number;
    description?: string;
    aliases?: string[];
    message?: Message;
    cooldownToUse?: number;
}
