import { SlashCommandOption } from '@bot/interfaces/slash-command-options.interface';
import { ApplicationCommandType } from 'discord.js';


export interface SlashCommandData {
    name: string;
    type: ApplicationCommandType;
    description: string;
    defaultPermission?: boolean;
    options?: SlashCommandOption[];
    aliases?: string[];
    hasRequired?: boolean;
}
