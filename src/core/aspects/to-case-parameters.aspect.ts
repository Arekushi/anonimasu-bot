import { Case } from '@bot/enums/string-case.enum';
import { toLower, toUpper } from '@core/utils/string.util';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class ToCaseParametersAspect implements Aspect {

    execute(ctx: AspectContext): string[] {
        const functionParams = ctx.functionParams;
        const caseParam = ctx.params;

        const strings = functionParams.filter(e => {
            if (typeof e === 'string') {
                return e;
            }
        });

        switch (caseParam) {
            case Case.LOWER:
                return strings.map(str => toLower(str));

            case Case.UPPER:
                return strings.map(str => toUpper(str));

            default:
                return strings.map(str => toLower(str));
        }
    }
}
