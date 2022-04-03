import { ArgumentMissingException } from '@bot/exceptions/argument-missing.exception';
import moment from 'moment';

import { Bot } from '@bot/classes/bot.class';
import { CooldownException } from '@bot/exceptions/cooldown-user.exception';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { User } from 'discord.js';


export class CheckCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): [CommandContext] {
        const command: Command<Bot> = ctx.target;
        const cmdCtx: CommandContext = ctx.functionParams[0];

        const author = this.getAuthor(cmdCtx);
        const authorId = author.id;
        const cmdMoment = command.cooldown.users.get(authorId);

        cmdCtx.author = author;

        if (cmdMoment) {
            if (moment().isBefore(cmdMoment)) {
                throw new CooldownException(command, cmdCtx);
            } else {
                command.cooldown.users.delete(authorId);
            }
        }

        if (cmdCtx.interaction) {
            command.data.options.forEach((o, i) => {
                const name = o.name;
                const value = cmdCtx.interaction.options.data[i]?.value;
                const required = o.required;

                if (required && !value) {
                    throw new ArgumentMissingException(name);
                }
            });
        }

        return [cmdCtx];
    }

    private getAuthor(cmdCtx: CommandContext): User {
        return cmdCtx.message?.author ?? cmdCtx.interaction?.user;
    }
}
