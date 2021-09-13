import { Bot } from 'client/abstract-bot';
import { Message } from 'discord.js';
import { Event } from 'interfaces/event';

let prefix = '--'

export const event: Event = {
    name: 'message',
    action: async (client: Bot, message: Message) => {
        prefix ??= client.config.prefix;

        if (isValidMessage(message)) {
            const args = getArgs(message.content);
            const command = client.commands.get(args.shift());

            if (command) {
                command.action(client, message, args)
                    .catch((error: any) => {
                        message.channel.send({
                            embeds: [client.embed({ description: `Error: ${error}` }, message)]
                        })
                })
            }
        }
    }
}

const isValidMessage = (message: Message): boolean => {
    const isValidPrefix = message.content.toLocaleLowerCase().startsWith(prefix);
    const isBot = message.author.bot;
    const isValidGuid = !!message.guild;

    return isValidPrefix && !isBot && isValidGuid;
}

const getArgs = (value: string): string[] => {
    return value.slice(prefix.length).trim().split(/ +/g);
}
