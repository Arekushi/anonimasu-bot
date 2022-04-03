import { Collection } from 'discord.js';
import { Cooldown } from '@bot/interfaces/cooldown.interface';


export const defaultCooldown: Cooldown = {
    reply: 0,
    toUse: 0,
    users: new Collection()
};
