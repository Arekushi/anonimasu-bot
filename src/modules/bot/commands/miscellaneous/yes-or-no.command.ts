import i18n from 'i18n';

import { toArray } from '@core/utils/string.util';
import { random50, randomElement } from '@core/utils/random.util';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { reply } from '@bot/functions/communication.function';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';


export class YesNoCommand extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'question',
                type: ApplicationCommandType.ChatInput,
                description: 'Make a question',
                options: [
                    {
                        name: 'question',
                        description: 'Uma pergunta fechada',
                        type: ApplicationCommandOptionType.String,
                        required: true,
                        aliases: ['q']
                    }
                ]
            },
            aliases: ['qt']
        });
    }

    async action(ctx: CommandContext): Promise<void> {
        console.log(ctx.options);
        const result = random50() ? 'yes' : 'no';
        const array = toArray(i18n.__(`commands.yes_or_no.responses.${result}`));
        const element = randomElement(array);

        await reply(ctx, element);
    }
}
