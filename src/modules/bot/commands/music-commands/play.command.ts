import { NullReturnAsyncAspect } from '@bot/aspects/null-return-async.aspect';
import { CheckPlayCommandUsageAspect } from '@bot/aspects/check-play-command-usage.aspect';
import { NullReturnException } from '@bot/exceptions/null-return.exception';
import { Music } from '@bot/interfaces/music.interface';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';


export class Play extends Command<AnonimasuBot> {
    constructor(client: AnonimasuBot) {
        super(client, {
            name: 'play',
            description: 'Comando para dar play em alguma música.',
            cooldownReply: 0,
            cooldownToUse: 0,
            aliases: ['p']
        });
    }

    @UseAspect(Advice.Before, CheckPlayCommandUsageAspect)
    async action(client: AnonimasuBot, args: string[]): Promise<void> {
        const music = await this.getMusic(args);
        const guildId = this.message.guild.id;
        const hasQueue = client.musicPlayer.hasQueue(guildId);

        if (!hasQueue) {
            const connection = await client.joinVoiceChannel(this.message);
            client.musicPlayer.startQueue(this.message, connection);
            client.musicPlayer.addMusic(guildId, music);
            client.musicPlayer.playMusic(guildId, music);
        } else {
            client.musicPlayer.addMusic(guildId, music);
        }

        this.message.channel.send(`Tocando a música: ${music.title}`);
    }

    @UseAspect(Advice.AfterReturn, NullReturnAsyncAspect, new NullReturnException('Test'))
    private async test(): Promise<any> {
        return null;
    }

    private async getMusic(args: string[]): Promise<Music> {
        if (ytdl.validateURL(args[0])) {
            const info = await ytdl.getInfo(args[0]);
            return {
                title: info.videoDetails.title,
                url: info.videoDetails.video_url
            };
        } else {
            const video = await this.videoFinder(args.join(' '));
            return {
                title: video.title,
                url: video.url
            };
        }
    }

    @UseAspect(Advice.AfterReturn, NullReturnAsyncAspect, new NullReturnException('VideoFinder'))
    private async videoFinder(query: string): Promise<any> {
        const videoResults = await ytSearch(query);
        return videoResults?.videos[0];
    }
}
