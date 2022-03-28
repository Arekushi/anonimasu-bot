import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { Exception } from '@core/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class DatabaseConnectionFailedException extends Exception {
    constructor(name: string, error: any) {
        super();

        this.message = `[Não foi possível conectar na base de dados] - [${name}] - ${new Date().toTimeString()} - ${error}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> { }
}
