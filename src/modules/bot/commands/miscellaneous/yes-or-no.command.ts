import { Message } from 'discord.js';
import i18n from 'i18n';

import { toArray } from '@core/utils/string.util';
import { random50, randomElement } from '@core/utils/random.util';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';


export class Ping extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'question',
                description: 'Make a question'
            },
            aliases: ['qt']
        });
    }

    async action(message: Message, args: any[]): Promise<void> {
        const result = random50() ? 'yes' : 'no';
        const array = toArray(i18n.__(`commands.yes_or_no.responses.${result}`));
        await this.respond(message, randomElement(array));
    }
}
