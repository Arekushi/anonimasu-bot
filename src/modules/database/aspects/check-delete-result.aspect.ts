import { NoRecordsException } from '@database/exceptions/no-records.exception';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { DeleteResult } from 'mongodb';


export class CheckDeleteResultAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<any> {
        const result: DeleteResult = ctx.returnValue;

        if (result.deletedCount <= 0) {
            throw new NoRecordsException({});
        }

        return result;
    }
}
