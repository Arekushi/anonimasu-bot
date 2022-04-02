import moment from 'moment';

import { Bot } from '@bot/classes/bot.class';
import { CooldownException } from '@bot/exceptions/cooldown-user.exception';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export class CheckCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): [CommandContext] {
        const command: Command<Bot> = ctx.target;
        const cmdCtx: CommandContext = ctx.functionParams[0];

        cmdCtx.author = cmdCtx.message?.author ?? cmdCtx.interaction?.user;
        const authorId = cmdCtx.author.id;
        const cmdMoment = command.cooldown.users.get(authorId);

        if (cmdMoment) {
            if (moment().isBefore(cmdMoment)) {
                throw new CooldownException(command, cmdCtx);
            } else {
                command.cooldown.users.delete(authorId);
            }
        }

        return [cmdCtx];
    }
}
