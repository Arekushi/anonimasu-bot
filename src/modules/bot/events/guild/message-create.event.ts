import { Message } from 'discord.js';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { CheckMessageAspect } from '@bot/aspects/check-message.aspect';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { getMessageArgs } from '@bot/utils/message.util';
import { createOptions } from '@bot/functions/slash-data.function';


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
        const args = getMessageArgs(this.client.config.prefix, message);
        const command = this.client.getCommand(args.shift());

        const options = createOptions(command.data, args);
        await command.run({ message, options });
    }
}
