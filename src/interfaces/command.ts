import { Category } from 'enums/category';
import { Action } from './action';

export interface Command {
    name: string;
    category: Category;
    description?: string;
    aliases?: string[];
    action: Action<any>;
}
