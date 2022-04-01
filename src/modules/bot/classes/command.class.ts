import moment from 'moment';

import { merge } from '@core/utils/object.util';
import { runException } from '@core/utils/exception.util';
import { LogCommandAspect } from '@bot/aspects/log-command.aspect';
import { CheckCommandUsageAspect } from '@bot/aspects/check-command-usage.aspect';
import { Bot } from '@bot/classes/bot.class';
import { CommandProps } from '@bot/interfaces/command-props.interface';
import { Message, MessageOptions, MessagePayload, CommandInteraction, Interaction, Collection } from 'discord.js';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { commandPropsDefault } from '@bot/default/command-props.default';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Cooldown } from '@bot/interfaces/cooldown.interface';
import { createCommand } from '@bot/utils/slash-command.util';


export abstract class Command<T extends Bot> {

    client: T;
    aliases?: string[];
    cooldown: Cooldown;
    global: boolean;

    data: SlashCommandBuilder;

    constructor(
        client: T,
        props?: CommandProps
    ) {
        props = merge(props, commandPropsDefault);

        this.client = client;
        this.aliases = props.aliases;
        this.cooldown = props.cooldown;
        this.global = props.global;
        this.data = createCommand(props.data);

        this.cooldown.users = new Collection();
    }

    protected abstract action(message: Message, args: string[]): Promise<void>;

    async respond(
        message: Message,
        options: string | MessagePayload | MessageOptions
    ): Promise<Message> {
        return await message.channel.send(options);
    }

    @UseAspect(Advice.Before, CheckCommandUsageAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async run(
        message: Message,
        args: string[]
    ): Promise<void> {
        setTimeout(async () => {
            try {
                this.action(message, args)
                    .then(() => {
                        if (this.cooldown.toUse > 0) {
                            this.startCooldown(message);
                        }
                    })
                    .catch((err) => {
                        runException(err, this.client, message);
                    });
            } catch (e) {
                await runException(e, this.client, message);
            }
        }, this.cooldown.reply);
    }

    startCooldown(message: Message): void {
        this.cooldown.users.set(
            message.author.id,
            moment().add(this.cooldown.toUse, 'milliseconds')
        );
    }
}
