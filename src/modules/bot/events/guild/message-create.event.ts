import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { CheckMessageAspect } from '@bot/aspects/check-message.aspect';
import { Message } from 'discord.js';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { getMessageArgs } from '@bot/utils/message.util';
import { getOptions } from '@bot/functions/options.function';


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

        const options = getOptions(command.data.options, args);
        await command.run({ message, options });
    }
}
