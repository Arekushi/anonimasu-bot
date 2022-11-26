import { Message } from 'discord.js';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { CheckMessageAspect } from '@bot/aspects/check-message.aspect';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { createOptions } from '@bot/functions/command-options.function';


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
        const args = this.getMessageArgs(message);
        const command = this.client.getCommand(args.shift());
        await command.run({
            operator: message,
            options: createOptions(command.data, args)
        });
    }

    private getMessageArgs(message: Message): string[] {
        const args = message.content
            .slice(this.client.config.prefix.length)
            .trim()
            .split(/ +/g);

        return args;
    }
}
