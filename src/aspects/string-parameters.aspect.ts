import { Bot } from 'classes/bot.class';
import { Aspect } from 'ts-aspect';

export class ToLowerCaseParametersAspect implements Aspect {
    execute(bot: Bot, args: string[]): void {
        args.forEach(arg => {
            arg.toLocaleLowerCase();
        });
    }
}
