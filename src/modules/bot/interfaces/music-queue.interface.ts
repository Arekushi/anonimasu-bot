import { VoiceConnection } from '@discordjs/voice';
import { Music } from '@bot/interfaces/music.interface';
import { StageChannel, VoiceChannel } from 'discord.js';


export interface MusicQueue {
    voiceChannel: VoiceChannel | StageChannel;
    textChannel: any;
    connection?: VoiceConnection;
    musics: Music[];
}
