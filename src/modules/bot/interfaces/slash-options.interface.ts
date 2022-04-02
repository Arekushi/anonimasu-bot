import { CommandOptionType } from '@bot/enums/command-option-type.enum';


export interface SlashOption {
    name: string;
    description: string;
    type: CommandOptionType;
    required?: boolean;
    autocomplete?: boolean;
    choices?: Choice[];
}

export interface Choice {
    name: string;
    value: string;
}
