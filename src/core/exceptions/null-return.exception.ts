import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Exception } from '@core/classes/exception.class';


export class NullReturnException extends Exception {

    constructor(
        public method: string
    ) {
        super();

        this.method = method;
        this.message = `O método ${this.method} retornou um valor nulo.`;
    }

    @UseAspect(Advice.After, LogExceptionAspect)
    async action(): Promise<void> { }
}
