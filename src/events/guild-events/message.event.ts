import { NonExistentCommandException } from 'exceptions/non-existent-command.exception';
import { CheckMessageAspect } from 'aspects/check-message.aspect';
import { Message } from 'discord.js';
import { getMessageArgs } from 'utils/string.util';
import { Bot } from 'classes/bot.class';
import { Event } from 'classes/event.class';
import { UseAspect, Advice } from 'ts-aspect';

export class MessageEvent extends Event {
    constructor() {
        super({
            name: 'message'
        });
    }

    @UseAspect(Advice.Before, CheckMessageAspect)
    async action(client: Bot, message: Message): Promise<void> {
        const args = getMessageArgs(message, client.config.prefix);
        const command = client.getCommand(args.shift());

        if (command) {
            command.setMessage(message);
            command.run(client, args);
        }

        throw new NonExistentCommandException(message);
    }
}
