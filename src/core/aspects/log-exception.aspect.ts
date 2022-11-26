import consola from 'consola';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogExceptionAspect implements Aspect {

    execute(ctx: AspectContext): void {
        consola.error(ctx.target.message);
    }
}
