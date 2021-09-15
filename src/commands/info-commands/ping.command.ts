import { Command } from 'classes/command.class';
import { Bot } from 'client/abstract-bot';
import { Category } from 'enums/category.enum';

export class Ping extends Command {
    constructor(client: Bot) {
        super(client, {
            name: 'ping',
            category: Category.MESSAGE,
            cooldownReply: 0,
            cooldownToUse: 10000,
            aliases: ['pg', 'PG']
        });
    }

    async action(client: Bot, args: string[]): Promise<void> {
        await this.respond("Pong");
    }
}
