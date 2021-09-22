import { Case } from 'enums/string-case.enum';
import { toLower, toUpper } from 'utils/string.util';
import { Bot } from 'classes/bot.class';
import { Aspect } from 'ts-aspect';

export class ToCaseParametersAspect implements Aspect {
    parameters: any[];

    execute(bot: Bot, args: any[]): string[] {
        const caseArg = this.parameters.shift();

        const strings = args.filter(e => {
            if (typeof e === 'string') {
                return e;
            }
        });

        switch (caseArg) {
            case Case.LOWER:
                return strings.map(str => toLower(str));
            
            case Case.UPPER:
                return strings.map(str => toUpper(str));
        }
    }
}
