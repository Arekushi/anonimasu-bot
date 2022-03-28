import consola from 'consola';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogConnectedAspect implements Aspect {

    execute(ctx: AspectContext): void {
        consola.success(
            `[Conectado com sucesso] - [${process.env.MONGODB_DATABASE}]`
        );
    }
}
