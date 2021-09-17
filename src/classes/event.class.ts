import { logException } from 'utils/exception.util';
import { EventProps } from 'interfaces/event-props.interface';
import { Bot } from 'classes/bot.class';

export abstract class Event<T extends Bot> {
    name: string;

    constructor(options?: EventProps) {
        this.name = options?.name;
    }

    async run(client: T, ...args: any[]): Promise<void> {
        try {
            await this.action(client, ...args);
        } catch (e) {
            await logException(e);
        }
    }

    abstract action(client: T, ...args: any[]): Promise<void>;
}
