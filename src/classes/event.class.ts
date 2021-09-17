import { Exception } from 'classes/exception.class';
import { EventProps } from 'interfaces/event-props.interface';
import { Bot } from 'classes/bot.class';
import consola from 'consola';

export abstract class Event<T extends Bot> {
    name: string;

    constructor(options?: EventProps) {
        this.name = options?.name;
    }

    async run(client: T, ...args: any[]): Promise<void> {
        try {
            await this.action(client, ...args);
        } catch (e) {
            if (e instanceof Exception) {
                await e.action(client, ...args);
            } else if (e instanceof Error) {
                consola.error(e);
            }
        }
    }

    abstract action(client: T, ...args: any[]): Promise<void>;
}
