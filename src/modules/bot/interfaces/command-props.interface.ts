import { Cooldown } from '@bot/interfaces/cooldown.interface';


export interface CommandProps {
    data: SlashData;
    cooldown?: Cooldown;
    aliases?: string[];
    global?: boolean;
}

export interface SlashData {
    name: string;
    description: string;
    defaultPermission?: boolean | undefined;
}
