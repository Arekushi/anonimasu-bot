import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { Entity } from '@database/interfaces/entity.interface';


export class OnCreateAspect implements Aspect {

    execute(ctx: AspectContext): any {
        const entity = ctx.functionParams[0];
        return [Object.assign({}, entity, this.onCreate())];
    }

    private onCreate(): Entity {
        return {
            enabled: true,
            created_on: new Date(),
            updated_on: new Date()
        };
    }
}
