import moment from 'moment';

import { merge } from '@core/utils/object.util';
import { runException } from '@core/utils/exception.util';
import { LogCommandAspect } from '@bot/aspects/log-command.aspect';
import { CheckCommandUsageAspect } from '@bot/aspects/check-command-usage.aspect';
import { Bot } from '@bot/classes/bot.class';
import { CommandProps } from '@bot/interfaces/command-props.interface';
import { CommandInteraction, Interaction, Collection, User } from 'discord.js';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { commandPropsDefault } from '@bot/default/command-props.default';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Cooldown } from '@bot/interfaces/cooldown.interface';
import { createCommand } from '@bot/utils/slash-command.util';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export abstract class Command<T extends Bot> {

    client: T;
    data: SlashCommandBuilder;

    aliases?: string[];
    cooldown: Cooldown;
    global: boolean;

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

    protected abstract action(ctx: CommandContext): Promise<void>;

    @UseAspect(Advice.Before, CheckCommandUsageAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async run(ctx: CommandContext): Promise<void> {
        setTimeout(async () => {
            try {
                await this.action(ctx);
            } catch (e) {
                await runException(e, this.client, ctx);
            } finally {
                this.startCooldown(ctx.author);
            }
        }, this.cooldown.reply);
    }

    startCooldown(author: User): void {
        if (this.cooldown.toUse > 0) {
            this.cooldown.users.set(
                author.id,
                moment().add(this.cooldown.toUse, 'milliseconds')
            );
        }
    }
}
