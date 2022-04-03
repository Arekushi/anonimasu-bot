import { MusicPlayer } from '@bot/classes/music-player.class';
import { Bot } from '@bot/classes/bot.class';


export class AnonimasuBot extends Bot {

    #musicPlayer: MusicPlayer;

    get musicPlayer(): MusicPlayer {
        return this.#musicPlayer;
    }

    constructor() {
        super();
        this.#musicPlayer = new MusicPlayer(this);
    }
}
