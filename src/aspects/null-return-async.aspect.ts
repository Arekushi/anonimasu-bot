import { Exception } from 'classes/exception.class';
import { first } from 'utils/array.util';
import { Aspect } from 'ts-aspect';

export class NullReturnAsyncAspect implements Aspect {
    async execute(target: any, returned: any[]): Promise<any> {
        const args = returned.pop();
        const exception: Exception = args.pop()[0];
        const methodReturn = first(returned);

        if(!(await methodReturn)) {
            throw exception;
        }

        return methodReturn;
    }
}
