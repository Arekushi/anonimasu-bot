import { Message } from 'discord.js';
import { isValidMessage } from 'utils/validations.utils';
import { getMessageArgs } from 'utils/string.utils';
import { Bot } from 'client/abstract-bot';
import { Event } from 'classes/event.class';

export class MessageEvent extends Event {
    constructor() {
        super({
            name: 'message'
        });
    }

    async action(client: Bot, message: Message): Promise<void> {
        if (isValidMessage(message, client)) {
            const args = getMessageArgs(message, client.config.prefix);
            const command = client.getCommand(args.shift());

            command.setMessage(message);
            command.run(client, args);
        }
    }
}
