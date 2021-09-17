import { NonExistentCommandException } from 'exceptions/non-existent-command.exception';
import { Command } from 'classes/command.class';
import { Bot } from 'classes/bot.class';
import { Aspect } from 'ts-aspect';

export class NullCommandAspect implements Aspect {
    execute(bot: Bot, returned: any[]): Command {
        const name = returned[0][0];
        const command = returned[1];
    
        if (!command) {
            throw new NonExistentCommandException(bot.messages.get(name));
        }

        return command;
    }
}
