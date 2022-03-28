import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { Exception } from '@core/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class DatabaseOperationException extends Exception {
    constructor(operation: string, error?: any) {
        super();

        this.message = `[Não foi possível realizar] - [${operation}] - ${new Date().toTimeString()} - ${error}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> { }
}
