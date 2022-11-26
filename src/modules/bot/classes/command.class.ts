import moment from 'moment';
import config from 'config';

import { User, CommandInteraction } from 'discord.js';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Bot } from '@bot/classes/bot.class';
import { merge, isEmpty } from '@core/utils/object.util';
import { runException } from '@core/utils/exception.util';
import { LogCommandAspect } from '@bot/aspects/log-command.aspect';
import { CheckCommandUsageAspect } from '@bot/aspects/check-command-usage.aspect';
import { CommandProps } from '@bot/interfaces/command-props.interface';
import { SlashCommandData } from '@src/modules/bot/interfaces/slash-command-data.interface';
import { commandPropsDefault } from '@bot/default/command-props.default';
import { Cooldown } from '@bot/interfaces/cooldown.interface';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { isEqual } from '@core/utils/string.util';


export abstract class Command<T extends Bot> {

    client: T;
    data: SlashCommandData;

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
        this.data = props.data;

        this.setup();
    }

    protected abstract action(ctx: CommandContext): Promise<void>;

    private setup(): void {
        this.data.options.sort((a, b) => {
            return (a.required === b.required) ? 0 : a.required ? -1 : 1;
        });

        this.data.options = this.data.options?.map(option => {
            option.aliases = option.aliases?.map(alias => {
                return `${config.get('alias-prefix')}${alias.replace(/\W/g, '')}`;
            }) ?? [];

            return option;
        });
    }

    get<E>(
        ctx: CommandContext,
        name: string,
        defaultValue?: E
    ): E {
        const value = this.getOptionValue(ctx, name);
        return [value, defaultValue].filter(v => !isEmpty(v))[0];
    }

    private getOptionValue(
        ctx: CommandContext,
        name: string
    ): any {
        const options = (ctx.options ?? (ctx.operator as CommandInteraction).options);

        if (Array.isArray(options)) {
            return options.find(o => isEqual(o.name, name))?.value;
        } else {
            return options.get(name)?.value;
        }
    }

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
