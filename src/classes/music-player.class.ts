import ytdl from 'ytdl-core';
import { Music } from 'interfaces/music.interface';
import { MusicQueue } from 'interfaces/music-queue.interface';
import { Collection, Message } from 'discord.js';

import {
    AudioPlayer,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    VoiceConnection,
} from '@discordjs/voice';

export class MusicPlayer {
    private queues: Collection<string, MusicQueue>;
    private audioPlayer: AudioPlayer;

    constructor() {
        this.queues = new Collection();
        this.audioPlayer = createAudioPlayer();
    }

    public hasQueue(guild: string) {
        return this.queues.has(guild);
    }

    public getQueue(guild: string) {
        return this.queues.get(guild);
    }

    public addMusic(guild: string, music: Music): void {
        const musicQueue = this.queues.get(guild);
        musicQueue.musics.push(music);
    }

    public startQueue(message: Message, connection: VoiceConnection): void {
        const musicQueue = {
            textChannel: message.channel,
            voiceChannel: message.member.voice.channel,
            connection,
            musics: []
        };

        this.queues.set(message.guild.id, musicQueue);
        musicQueue.connection.subscribe(this.audioPlayer);
    }

    public endQueue(guild: string): void {
        this.queues.delete(guild);
    }

    public async playSong(guid: string, song: Music): Promise<void> {
        const songQueued = this.queues.get(guid);
        
        // if (!songQueued) {
        //     this.leaveVoiceChannel();
        //     this.queues.delete(guid);
        //     return;
        // }

        const stream = ytdl(song.url, { filter: 'audioonly' });
        const audio = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        this.audioPlayer.play(audio);
    }

    public pauseSong(): void {

    }

    public stop(): void {

    }
}