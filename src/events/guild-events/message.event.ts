import { CheckMessageAspect } from 'aspects/check-message.aspect';
import { Message } from 'discord.js';
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
        const args = client.getMessageArgs(message);
        const command = client.getCommand(args.shift());

        command.setMessage(message);
        command.run(client, args);
    }
}
