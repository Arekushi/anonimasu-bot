import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class NullReturnAsyncAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<any> {
        const exception = ctx.params;
        const methodReturn = ctx.returnValue;

        if (!(await methodReturn)) {
            throw exception;
        }

        return methodReturn;
    }
}
