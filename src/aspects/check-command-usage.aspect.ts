import { Bot } from 'classes/bot.class';
import { CooldownException } from 'exceptions/cooldown-user.exception';
import { Command } from 'classes/command.class';
import { Aspect } from 'ts-aspect';
import moment from 'moment';

export class CheckCommandUsageAspect implements Aspect {
    execute(command: Command<Bot>): void {
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
