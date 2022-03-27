import moment from 'moment';

import { Bot } from '@bot/classes/bot.class';
import { CooldownException } from '@bot/exceptions/cooldown-user.exception';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const command: Command<Bot> = ctx.target;
        const userId = command.message.author.id;
        const commandMoment = command.cooldownUsers.get(userId);

        if (commandMoment) {
            if (moment().isBefore(commandMoment)) {
                throw new CooldownException(command);
            } else {
                command.cooldownUsers.delete(userId);
            }
        }
    }
}
