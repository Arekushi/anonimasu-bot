import { CheckPlayCommandUsageAspect } from '@bot/aspects/check-play-command-usage.aspect';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { CommandOptionType } from '@bot/enums/command-option-type.enum';
import { get } from '@bot/functions/command-options.function';
import { reply } from '@bot/functions/communication.function';


export class Play extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'play',
                description: 'Comando para dar play em alguma música.',
                options: [
                    {
                        name: 'music',
                        description: 'Uma URL ou nome de uma música (Youtube)',
                        type: CommandOptionType.STRING,
                        required: true,
                        alias: '-m'
                    }
                ]
            },
            aliases: ['p']
        });
    }

    @UseAspect(Advice.Before, CheckPlayCommandUsageAspect)
    async action(ctx: CommandContext): Promise<void> {
        const music = get<string>(ctx, 'music');
        const guildId = ctx.operator.guildId;
        const player = this.client.musicPlayer;
        const hasQueue = player.hasQueue(guildId);

        if (!hasQueue) {
            await player.createQueue(ctx.operator);
        }

        await player.addMusic(guildId, music, ctx.author);
        await player.play(guildId);

        reply(ctx, `Tocando a música: ${music}`);
    }
}
