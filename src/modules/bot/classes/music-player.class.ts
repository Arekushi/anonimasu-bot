import { CheckHasQueueAspect } from '@bot/aspects/check-has-queue.aspect';
import { Operator } from '@bot/types/operator.type';
import { BotNullReturnException } from '@bot/exceptions/bot-null-return.exception';
import { NullReturnAsyncAspect } from '@core/aspects/null-return-async.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { GuildMember, User } from 'discord.js';
import { Player, Queue, Track, QueryType } from 'discord-player';
import { Bot } from '@bot/classes/bot.class';
import { player } from '@bot/default/player.default';


export class MusicPlayer {

    #client: Bot;
    #player: Player;

    constructor(
        client: Bot
    ) {
        this.#client = client;
        this.#player = player(client);
    }

    public hasQueue(guildId: string): boolean {
        return this.#player.queues.has(guildId);
    }

    public getQueue(guildId: string): Queue {
        return this.#player.queues.get(guildId);
    }

    @UseAspect(Advice.Before, CheckHasQueueAspect)
    public async addMusic(
        operator: Operator,
        music: string,
        author: User
    ): Promise<void> {
        const queue = this.getQueue(operator.guildId);
        const tracks = await this.getTracks(music, author);

        // for (const track of tracks) {
        //     console.log(track.toJSON());
        // }

        queue.addTrack(tracks[0]);
    }

    public async createQueue(operator: Operator): Promise<void> {
        const queue = this.#player.createQueue(operator.guild, {
            metadata: {
                textChannel: operator.channel
            },
        });

        await queue.connect((operator.member as GuildMember).voice.channel);
    }

    public async play(guildId: string): Promise<void> {
        const queue = this.getQueue(guildId);

        if (!queue.playing) {
            await queue.play();
        }
    }

    @UseAspect(Advice.AfterReturn, NullReturnAsyncAspect, new BotNullReturnException('getTrack'))
    public async getTracks(
        query: string | Track,
        user: User
    ): Promise<Track[]> {
        const result = await this.#player.search(query, {
            requestedBy: user,
            searchEngine: QueryType.AUTO
        });

        return result.tracks;
    }
}
