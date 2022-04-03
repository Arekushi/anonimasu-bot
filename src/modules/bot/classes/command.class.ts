import moment from 'moment';

import { Collection, User } from 'discord.js';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Bot } from '@bot/classes/bot.class';
import { merge } from '@core/utils/object.util';
import { runException } from '@core/utils/exception.util';
import { LogCommandAspect } from '@bot/aspects/log-command.aspect';
import { CheckCommandUsageAspect } from '@bot/aspects/check-command-usage.aspect';
import { CommandProps } from '@bot/interfaces/command-props.interface';
import { SlashData } from '@bot/interfaces/slash-data.interface';
import { commandPropsDefault } from '@bot/default/command-props.default';
import { Cooldown } from '@bot/interfaces/cooldown.interface';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { configData } from '@bot/functions/slash-data.function';


export abstract class Command<T extends Bot> {

    client: T;
    data: SlashData;

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
        this.data = configData(props.data);
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
