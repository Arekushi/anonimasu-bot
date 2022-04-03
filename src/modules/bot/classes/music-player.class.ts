import { BotNullReturnException } from '@bot/exceptions/bot-null-return.exception';
import { NullReturnAsyncAspect } from '@core/aspects/null-return-async.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { GuildMember, User } from 'discord.js';
import { Operator } from '@bot/types/operator.type';
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

    public async addMusic(
        guildId: string,
        music: string,
        author: User
    ): Promise<void> {
        const queue = this.getQueue(guildId);
        const track = await this.getTrack(music, author);

        queue.addTrack(track);
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
    public async getTrack(args: string, user: User): Promise<Track> {
        const track = await this.#player.search(args, {
            requestedBy: user,
            searchEngine: QueryType.AUTO
        });

        return track.tracks[0];
    }
}
