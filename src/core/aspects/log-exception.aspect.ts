import consola from 'consola';

import { Exception } from '@bot/classes/exception.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogExceptionAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const exception: Exception = ctx.target;
        consola.error(exception.message);
    }
}
