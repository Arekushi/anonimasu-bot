import { Case } from '@bot/enums/string-case.enum';
import { toLower, toUpper } from '@core/utils/string.util';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class ToCaseParametersAspect implements Aspect {

    execute(ctx: AspectContext): string[] {
        const args = ctx.functionParams;
        const caseArg = ctx.params;

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
