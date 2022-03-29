import config from 'config';

import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { LogBotOnlineAspect } from '@bot/aspects/log-bot-online.aspect';


export class ReadyEvent extends Event<AnonimasuBot> {
    constructor() {
        super({
            name: 'ready'
        });
    }

    @UseAspect(Advice.Before, LogBotOnlineAspect)
    async action(client: AnonimasuBot): Promise<void> {
        client.user.setActivity(config.get('bot.activity'));
    }
}
