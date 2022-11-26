import i18n from 'i18n';

import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { reply } from '@bot/functions/communication.function';
import { ApplicationCommandType } from 'discord.js';


export class SuperIdolCommand extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'super-idol',
                type: ApplicationCommandType.ChatInput,
                description: 'Super Idol only',
            },
            aliases: ['si']
        });
    }

    async action(ctx: CommandContext): Promise<void> {
        await reply(ctx, i18n.__('commands.super-idol.message'));
    }
}
