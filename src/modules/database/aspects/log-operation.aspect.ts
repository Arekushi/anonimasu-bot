import consola from 'consola';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogOperationAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const operation = ctx.params;
        const model = ctx.target.model.collection.collectionName;
        const date = new Date().toTimeString();

        consola.success(
            `[Realizado com sucesso] - [${operation}] - [${model}] - ${date}`
        );
    }
}
