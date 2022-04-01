import { Message } from 'discord.js';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Command } from '@bot/classes/command.class';


export class Ping extends Command<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            data: {
                name: 'ping',
                description: 'Only a ping command'
            },
            aliases: ['pg']
        });
    }

    async action(message: Message, args: any[]): Promise<void> {
        await this.respond(message, 'Pong');
    }
}
