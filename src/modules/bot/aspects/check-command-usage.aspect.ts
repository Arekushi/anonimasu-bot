import { Message } from 'discord.js';
import moment from 'moment';

import { Bot } from '@bot/classes/bot.class';
import { CooldownException } from '@bot/exceptions/cooldown-user.exception';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const command: Command<Bot> = ctx.target;
        const message: Message = ctx.functionParams[0];
        const userId = message.author.id;
        const commandMoment = command.cooldown.users.get(userId);

        if (commandMoment) {
            if (moment().isBefore(commandMoment)) {
                throw new CooldownException(command, message);
            } else {
                command.cooldown.users.delete(userId);
            }
        }
    }
}
