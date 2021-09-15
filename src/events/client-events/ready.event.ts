import { Bot } from 'client/abstract-bot';
import { Event } from 'classes/event.class';

export class Ready extends Event {
    constructor() {
        super({
            name: 'ready'
        });
    }

    async action(client: Bot): Promise<void> {
        client.logger.success(`${client.user.tag} is online!`)
        client.user.setActivity({
            name: '日本語',
            type: 'LISTENING'
        })
    }
}
