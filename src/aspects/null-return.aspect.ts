import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class NullReturnAspect implements Aspect {

    execute(ctx: AspectContext): any {
        const exception = ctx.params;
        const methodReturn = ctx.returnValue;

        if (!methodReturn) {
            throw exception;
        }

        return methodReturn;
    }
}
