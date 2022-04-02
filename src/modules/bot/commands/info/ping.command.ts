import { get } from '@bot/functions/options.function';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { reply } from '@bot/functions/communication.function';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';


export class Ping extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'ping',
                description: 'Only a ping command',
                options: [
                    {
                        name: 'name',
                        description: 'Nome de teste',
                        type: ApplicationCommandOptionTypes.STRING,
                        required: true
                    }
                ]
            },
            aliases: ['pg']
        });
    }

    async action(ctx: CommandContext): Promise<void> {
        await reply(ctx, get(ctx, 'name'));
    }
}
