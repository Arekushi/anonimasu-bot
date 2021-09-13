import { Category } from 'enums/category';
import { ActionCommand } from './action';

export interface Command {
    name: string;
    category?: Category;
    description?: string;
    aliases?: string[];
    action: ActionCommand;
}
