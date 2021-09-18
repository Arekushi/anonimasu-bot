import { Exception } from 'classes/exception.class';
import { first } from 'utils/array.util';
import { Aspect } from 'ts-aspect';

export class NullReturnAspect implements Aspect {
    execute(target: any, returned: any[]): Promise<any> {
        const args = returned.pop();
        const exception: Exception = args.pop()[0];
        const methodReturn = first(returned);

        if(!methodReturn) {
            throw exception;
        }

        return methodReturn;
    }
}
