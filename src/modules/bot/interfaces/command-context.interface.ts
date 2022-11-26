import { Operator } from '@bot/types/operator.type';
import { User } from 'discord.js';


export interface CommandContext {
    author?: User;
    operator?: Operator;
    options?: Option[];
}

export interface Option {
    name: string;
    value: any;
}
