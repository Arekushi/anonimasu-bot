import { SlashOption } from '@bot/interfaces/slash-options.interface';


export interface SlashData {
    name: string;
    description: string;
    defaultPermission?: boolean;
    options?: SlashOption[];
    aliases?: string[];
    singleRequired?: boolean;
}
