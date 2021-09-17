import { AnonimasuBot } from 'client/anonimasu.bot';
import { Command } from 'classes/command.class';
import { Category } from 'enums/category.enum';

export class Ping extends Command<AnonimasuBot> {
    constructor(client: AnonimasuBot) {
        super(client, {
            name: 'ping',
            category: Category.MESSAGE,
            cooldownReply: 0,
            cooldownToUse: 0,
            aliases: ['pg']
        });
    }

    async action(client: AnonimasuBot, args: string[]): Promise<void> {
        await this.respond("Pong");
    }
}
