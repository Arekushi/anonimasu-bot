import { partials } from '@bot/default/bot-partials.default';
import { intents } from '@bot/default/bot-intents.default';
import { MusicPlayer } from '@bot/classes/music-player.class';
import { Bot } from '@bot/classes/bot.class';


export class AnonimasuBot extends Bot {

    #musicPlayer: MusicPlayer;

    get musicPlayer(): MusicPlayer {
        return this.#musicPlayer;
    }

    constructor() {
        super({
            intents,
            partials
        });
        this.#musicPlayer = new MusicPlayer(this);
    }
}
