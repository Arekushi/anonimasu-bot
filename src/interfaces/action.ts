import { Bot } from 'client/abstract-bot';
import { Message } from 'discord.js';

export interface Action<T> {
    (client: Bot, message?: Message, args?: T): Promise<any>
}
