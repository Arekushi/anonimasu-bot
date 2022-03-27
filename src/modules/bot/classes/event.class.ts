import { logException } from '@core/utils/exception.util';
import { EventProps } from '@bot/interfaces/event-props.interface';
import { Bot } from '@bot/classes/bot.class';


export abstract class Event<T extends Bot> {
    name: string;

    constructor(options?: EventProps) {
        this.name = options?.name;
    }

    async run(client: T, ...args: any[]): Promise<void> {
        try {
            await this.action(client, ...args);
        } catch (e) {
            await logException(e, client, ...args);
        }
    }

    abstract action(client: T, ...args: any[]): Promise<void>;
}
