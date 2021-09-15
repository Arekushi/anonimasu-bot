import { EventProps } from 'interfaces/event-props.interface';
import { Bot } from 'classes/bot.class';

export abstract class Event {
    name: string;

    constructor(options?: EventProps) {
        this.name = options?.name;
    }

    abstract action(client: Bot, ...args: any[]): Promise<void>;
}
