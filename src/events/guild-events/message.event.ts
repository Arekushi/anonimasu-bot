import { isValidCommand } from 'utils/validations.utils';
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
        const prefix = client.config.prefix;

        if (isValidMessage(message, prefix)) {
            const args = getMessageArgs(message, prefix);
            const command = client.getCommand(args.shift());

            command.setMessage(message);

            if (isValidCommand(command)) {
                command.run(client, message, args);
            } else {
                await command.respond("Espera sua vez!")
            }
        }
    }
}
