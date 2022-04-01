import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashData } from '@bot/interfaces/command-props.interface';


export const createCommand = (data: SlashData): SlashCommandBuilder => {
    return new SlashCommandBuilder()
        .setName(data.name)
        .setDescription(data.description)
        .setDefaultPermission(data.defaultPermission);
};
