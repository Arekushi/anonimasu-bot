import { CheckPlayCommandUsageAspect } from '@bot/aspects/check-play-command-usage.aspect';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { reply } from '@bot/functions/communication.function';
import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';


export class Play extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'play',
                type: ApplicationCommandType.ChatInput,
                description: 'Comando para dar play em alguma música.',
                options: [
                    {
                        name: 'music',
                        description: 'Uma URL ou nome de uma música (Youtube)',
                        type: ApplicationCommandOptionType.String,
                        required: false,
                        aliases: ['m']
                    }
                ]
            },
            aliases: ['p']
        });
    }

    @UseAspect(Advice.Before, CheckPlayCommandUsageAspect)
    async action(ctx: CommandContext): Promise<void> {
        const music = this.getOption<string>(ctx, 'music');
        const guildId = ctx.operator.guildId;
        const player = this.client.musicPlayer;

        await player.addMusic(ctx.operator, music, ctx.author);
        await player.play(guildId);

        reply(ctx, `Tocando a música: ${music}`);
    }
}
