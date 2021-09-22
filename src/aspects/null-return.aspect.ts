import { Aspect } from 'ts-aspect';

export class NullReturnAspect implements Aspect {
    parameters: any[];

    execute(target: any, returned: any[]): any {
        const exception = this.parameters.pop();
        const methodReturn = returned.shift();

        if(!methodReturn) {
            throw exception;
        }

        return methodReturn;
    }
}
