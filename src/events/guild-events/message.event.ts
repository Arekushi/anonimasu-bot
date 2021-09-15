import { Message } from 'discord.js';
import { isValidMessage } from 'utils/validations.util';
import { getMessageArgs } from 'utils/string.util';
import { Bot } from 'classes/bot.class';
import { Event } from 'classes/event.class';

export class MessageEvent extends Event {
    constructor() {
        super({
            name: 'message'
        });
    }

    async action(client: Bot, message: Message): Promise<void> {
        if (isValidMessage(client, message)) {
            const args = getMessageArgs(message, client.config.prefix);
            const command = client.getCommand(args.shift());

            command.setMessage(message);
            command.run(client, args);
        }
    }
}
