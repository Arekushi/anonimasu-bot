import { Player } from 'discord-player';
import { Bot } from '@bot/classes/bot.class';


// tslint:disable: no-bitwise
export const player = (client: Bot) => {
    return new Player(client, {
        ytdlOptions: {
            filter: 'audioonly',
            dlChunkSize: 0,
            highWaterMark: 1 << 30
        }
    });
};
