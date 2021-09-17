import { Bot } from 'classes/bot.class';
import { Aspect } from 'ts-aspect';

export class ToLowerCaseParametersAspect implements Aspect {
    execute(bot: Bot, args: any[]): void {
        args.forEach(arg => {
            if (arg instanceof String) {
                arg.toLowerCase();
            }
        });
    }
}
