import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { LogBotOnlineAspect } from '@bot/aspects/log-bot-online.aspect';
import { activity } from '@bot/default/bot-activity.default';


export class ReadyEvent extends Event<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            name: 'ready',
            once: true
        });
    }

    @UseAspect(Advice.Before, LogBotOnlineAspect)
    async action(): Promise<void> {
        this.client.user.setActivity(activity);
    }
}
