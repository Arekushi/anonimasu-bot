import { AnonimasuBot } from 'client/anonimasu.bot';
import { Event } from 'classes/event.class';
import consola from 'consola';

export class Ready extends Event<AnonimasuBot> {
    constructor() {
        super({
            name: 'ready'
        });
    }

    async action(client: AnonimasuBot): Promise<void> {
        consola.success(`${client.user.tag} is online!`);
        client.user.setActivity({
            name: '日本語',
            type: 'LISTENING'
        });
    }
}
