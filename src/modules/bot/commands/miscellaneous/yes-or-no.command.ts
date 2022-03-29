import i18n from 'i18n';

import { toArray } from '@core/utils/string.util';
import { random50, randomElement } from '@core/utils/random.util';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';


export class Ping extends Command<AnonimasuBot> {
    constructor(client: AnonimasuBot) {
        super(client, {
            name: 'question',
            cooldownReply: 0,
            cooldownToUse: 0,
            aliases: ['qt']
        });
    }

    async action(client: AnonimasuBot, args: string[]): Promise<void> {
        const result = random50() ? 'yes' : 'no';
        const array = toArray(i18n.__(`commands.yes_or_no.responses.${result}`));
        await this.respond(randomElement(array));
    }
}
