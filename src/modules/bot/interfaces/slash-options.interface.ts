import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';


export interface SlashOption {
    name: string;
    description: string;
    type: ApplicationCommandOptionTypes;
    required?: boolean;
    autocomplete?: boolean;
    choices?: Choice[];
}

export interface Choice {
    name: string;
    value: string;
}
