import { Bot } from 'client/abstract-bot';
import { Event } from 'interfaces/event';

export const event: Event = {
    name: 'ready',
    action: async (client: Bot) => {
        client.logger.success(`${client.user.tag} is on`)
    }
};
