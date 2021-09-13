import { Bot } from 'client/abstract-bot';
import { Message } from 'discord.js';
import { Event } from 'interfaces/event';

export const event: Event = {
    name: 'message',
    action: async (client: Bot, message: Message) => {
        if (isValidMessage(client, message)) {
            const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
            const command = client.commands.get(args.shift());

            if (command) {
                command
                    .action(client, message, args)
                    .catch((error: any) => {
                        message.channel.send({
                            embeds: [client.embed({ description: `Error: ${error}` }, message)]
                        })
                    })
            }
        }
    }
}

const isValidMessage = (client: Bot, message: Message): boolean => {
    return !(message.author.bot 
        || !message.guild 
        || !message.content.toLocaleLowerCase().startsWith(client.config.prefix)
    )
}
