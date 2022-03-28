import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { Entity } from '@database/interfaces/entity.interface';


export class OnUpdateAspect implements Aspect {

    execute(ctx: AspectContext): Entity {
        const entity = ctx.functionParams[0];
        return Object.assign({}, entity, this.onUpdate());
    }

    private onUpdate(): Entity {
        return {
            updated_on: new Date()
        };
    }
}
