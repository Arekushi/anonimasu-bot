import { Cooldown } from '@bot/interfaces/cooldown.interface';
import { SlashCommandData } from '@src/modules/bot/interfaces/slash-command-data.interface';


export interface CommandProps {
    data: SlashCommandData;
    cooldown?: Cooldown;
    aliases?: string[];
    global?: boolean;
}
