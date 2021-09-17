import { Message } from 'discord.js';

export interface CommandProps {
    name: string;
    cooldownReply?: number;
    description?: string;
    aliases?: string[];
    message?: Message;
    cooldownToUse?: number;
}
