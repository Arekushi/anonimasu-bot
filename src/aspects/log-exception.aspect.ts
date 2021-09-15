import consola from 'consola';
import { Exception } from 'classes/exception.class';
import { Aspect } from 'ts-aspect';

export class LogExceptionAspect implements Aspect {
    execute(exception: Exception): void {
        consola.error(exception.message);
    }
}
