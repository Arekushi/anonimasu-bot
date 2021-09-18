import { MusicPlayer } from 'classes/music-player.class';
import { Message } from 'discord.js';
import { Bot } from "classes/bot.class";

import {
    joinVoiceChannel,
    VoiceConnection,
    VoiceConnectionStatus,
    entersState
} from '@discordjs/voice';

export class AnonimasuBot extends Bot {

    private _musicPlayer: MusicPlayer;

    get musicPlayer() {
        return this._musicPlayer;
    }

    constructor() {
        super();
        this._musicPlayer = new MusicPlayer();
    }

    public async joinVoiceChannel(message: Message): Promise<VoiceConnection> {
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
            return connection;
        } catch (error) {
            connection.destroy();
            throw error;
        }
    }

    public leaveVoiceChannel(): void {
        console.log('leave');
    }
}
