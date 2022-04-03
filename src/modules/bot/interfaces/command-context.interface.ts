import { Operator } from '@bot/types/operator.type';
import { User } from 'discord.js';


export interface CommandContext {
    operator?: Operator;
    author?: User;
    options?: Option[];
}

export interface Option {
    name: string;
    value: any;
}
