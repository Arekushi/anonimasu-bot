import { Music } from '@bot/interfaces/music.interface';
import { StageChannel, VoiceChannel } from 'discord.js';
import { Queue } from 'discord-player';


export interface MusicQueue {
    voiceChannel: VoiceChannel | StageChannel;
    textChannel: any;
    musics: Music[];
    queue?: Queue;
}
