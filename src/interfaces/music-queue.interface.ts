import { VoiceConnection } from '@discordjs/voice';
import { Music } from 'interfaces/music.interface';
import { StageChannel, TextBasedChannels, VoiceChannel } from "discord.js";

export interface MusicQueue {
    voiceChannel: VoiceChannel | StageChannel;
    textChannel: TextBasedChannels;
    connection?: VoiceConnection;
    musics: Music[];
}
