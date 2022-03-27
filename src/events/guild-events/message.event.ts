import { AnonimasuBot } from '@client/anonimasu.bot';
import { CheckMessageAspect } from '@aspects/check-message.aspect';
import { Message } from 'discord.js';
import { Event } from '@classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class MessageEvent extends Event<AnonimasuBot> {
    constructor() {
        super({
            name: 'message'
        });
    }

    @UseAspect(Advice.Before, CheckMessageAspect)
    async action(client: AnonimasuBot, message: Message): Promise<void> {
        const args = client.getMessageArgs(message);
        const command = client.getCommand(args.shift());

        command.setMessage(message);
        command.run(client, args);
    }
}
