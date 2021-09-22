import { Aspect } from 'ts-aspect';

export class NullReturnAsyncAspect implements Aspect {
    parameters: any[];

    async execute(target: any, returned: any[]): Promise<any> {
        const exception = this.parameters.pop();
        const methodReturn = returned.shift();

        if(!(await methodReturn)) {
            throw exception;
        }

        return methodReturn;
    }
}
