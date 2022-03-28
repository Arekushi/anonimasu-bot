import { ExceptionContext } from '@core/interfaces/exception-context';


export abstract class Exception extends Error {
    constructor() {
        super();
    }

    abstract action(ctx?: ExceptionContext<any>): Promise<void>;
}
