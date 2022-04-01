import { Moment } from 'moment';
import { Collection } from 'discord.js';


export interface Cooldown {
    reply?: number;
    toUse?: number;
    users?: Collection<string, Moment>;
}
