import { Bot } from 'client/abstract-bot';
import { Message } from 'discord.js';
import { Command } from 'interfaces/command';

export const command: Command = {
    name: 'ping',
    action: async (client: Bot, message: Message) => {
        await message.channel.send({
            embeds: [
                client.embed({
                    description: `Pong`
                }, message)
            ]
        });
    }
}
