import { runException } from '@core/utils/exception.util';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class ExceptionActionAspect implements Aspect {

    execute(ctx: AspectContext): void {
        runException(ctx.error);
        throw ctx.error;
    }
}
