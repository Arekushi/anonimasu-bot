import { Song } from 'interfaces/song.interface';
import { CheckPlayCommandUsageAspect } from 'aspects/check-play-command-usage.aspect';
import { AnonimasuBot } from 'client/anonimasu.bot';
import { Command } from 'classes/command.class';
import { UseAspect, Advice } from 'ts-aspect';
import ytSearch from 'yt-search';
import ytdl from 'ytdl-core';

export class Play extends Command<AnonimasuBot> {
    constructor(client: AnonimasuBot) {
        super(client, {
            name: 'play',
            description: 'Commando para dar play em alguma música.',
            cooldownReply: 0,
            cooldownToUse: 0,
            aliases: ['p']
        });
    }

    @UseAspect(Advice.Before, CheckPlayCommandUsageAspect)
    async action(client: AnonimasuBot, args: string[]): Promise<void> {   
        const song = await this.getSong(args);
    }

    private async getSong(args: string[]): Promise<Song> {
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

    private async videoFinder(query: string): Promise<any> {
        const videoResults = await ytSearch(query);
        return videoResults.videos.length > 1 ?
            videoResults.videos[0] : null;
    }
}
