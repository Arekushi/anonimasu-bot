import { runException } from '@core/utils/exception.util';
import { merge } from '@core/utils/object.util';
import { eventPropsDefault } from '@bot/default/event-props.default';
import { EventProps } from '@bot/interfaces/event-props.interface';
import { Bot } from '@bot/classes/bot.class';


export abstract class Event<T extends Bot> {

    client: T;
    name: string;
    once: boolean;

    constructor(
        client: T,
        props?: EventProps
    ) {
        props = merge(props, eventPropsDefault());

        this.client = client;
        this.name = props.name;
        this.once = props.once;
    }

    async run(...args: any[]): Promise<void> {
        args = args.filter(a => !(a instanceof Bot));

        try {
            await this.action(...args);
        } catch (e) {
            await runException(e, this.client, ...args);
        }
    }

    abstract action(...args: any[]): Promise<void>;
}
