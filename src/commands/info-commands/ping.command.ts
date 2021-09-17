import { AnonimasuBot } from 'client/anonimasu.bot';
import { Command } from 'classes/command.class';

export class Ping extends Command<AnonimasuBot> {
    constructor(client: AnonimasuBot) {
        super(client, {
            name: 'ping',
            cooldownReply: 0,
            cooldownToUse: 0,
            aliases: ['pg']
        });
    }

    async action(client: AnonimasuBot, args: string[]): Promise<void> {
        await this.respond("Pong");
    }
}
