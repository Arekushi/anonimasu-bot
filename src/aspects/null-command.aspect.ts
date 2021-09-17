import { getLast } from 'utils/array.util';
import { NonExistentCommandException } from 'exceptions/non-existent-command.exception';
import { Command } from 'classes/command.class';
import { Bot } from 'classes/bot.class';
import { Aspect } from 'ts-aspect';

export class NullCommandAspect implements Aspect {
    execute(bot: Bot, returned: Command[]): Command {
        const command = returned[0];
    
        if (!command) {
            throw new NonExistentCommandException(getLast(bot.messages));
        }

        return command;
    }
}
