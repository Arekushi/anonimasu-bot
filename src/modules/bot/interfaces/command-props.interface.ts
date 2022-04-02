import { Cooldown } from '@bot/interfaces/cooldown.interface';
import { SlashData } from '@bot/interfaces/slash-data.interface';


export interface CommandProps {
    data: SlashData;
    cooldown?: Cooldown;
    aliases?: string[];
    global?: boolean;
}
