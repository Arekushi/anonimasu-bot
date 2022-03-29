import { LogExceptionAspect } from '@core/aspects/log-exception.aspect';
import { Exception } from '@core/classes/exception.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class NoRecordsException extends Exception {
    constructor(parameters: any, error?: any) {
        super();

        const date = new Date().toTimeString();
        this.message = `[Não há registros com os parâmetros informados] - [${parameters}] - ${date} - ${error}`;
    }

    @UseAspect(Advice.Before, LogExceptionAspect)
    async action(): Promise<void> { }
}
