import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { CheckMessageAspect } from '@bot/aspects/check-message.aspect';
import { Message } from 'discord.js';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { getMessageArgs } from '@bot/utils/message.util';


export class MessageEvent extends Event<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            name: 'messageCreate',
            once: false
        });
    }

    @UseAspect(Advice.Before, CheckMessageAspect)
    async action(message: Message): Promise<void> {
        const args = getMessageArgs(this.client, message);
        const command = this.client.getCommand(args.shift());

        command.run(message, args);
    }
}
