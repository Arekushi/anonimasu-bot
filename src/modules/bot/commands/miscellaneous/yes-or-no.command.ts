import i18n from 'i18n';

import { toArray } from '@core/utils/string.util';
import { random50, randomElement } from '@core/utils/random.util';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { reply } from '@bot/functions/communication.function';


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

    async action(ctx: CommandContext): Promise<void> {
        const result = random50() ? 'yes' : 'no';
        const array = toArray(i18n.__(`commands.yes_or_no.responses.${result}`));
        const element = randomElement(array);

        await reply(ctx, element);
    }
}
