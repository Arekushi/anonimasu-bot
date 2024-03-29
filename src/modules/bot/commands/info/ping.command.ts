import { CommandContext } from '@bot/interfaces/command-context.interface';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { reply } from '@bot/functions/communication.function';
import { ApplicationCommandType } from 'discord.js';


export class Ping extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                type: ApplicationCommandType.ChatInput,
                name: 'ping',
                description: 'Only a ping command'
            },
            aliases: ['pg']
        });
    }

    async action(ctx: CommandContext): Promise<void> {
        await reply(ctx, 'pong');
    }
}
