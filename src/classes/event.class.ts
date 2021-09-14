import { IEvent } from 'interfaces/event.interface';
import { Bot } from 'client/abstract-bot';

export abstract class Event {
    name: string;

    constructor(options?: IEvent) {
        this.name = options?.name;
    }

    abstract action(client: Bot, ...args: any[]): Promise<void>;
}
