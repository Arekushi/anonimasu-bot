import config from 'config';

import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { LogBotOnlineAspect } from '@bot/aspects/log-bot-online.aspect';


export class ReadyEvent extends Event<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            name: 'ready',
            once: false
        });
    }

    @UseAspect(Advice.Before, LogBotOnlineAspect)
    async action(): Promise<void> {
        this.client.user.setActivity(config.get('bot.activity'));
    }
}
