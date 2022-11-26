import { SlashCommandData } from '@src/modules/bot/interfaces/slash-command-data.interface';
import { ApplicationCommandType } from 'discord.js';


export const slashDataDefault: SlashCommandData = {
    name: undefined,
    type: ApplicationCommandType.ChatInput,
    description: undefined,
    defaultPermission: true,
    options: []
};
