import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class RouteProcessingAspect implements Aspect {

    execute(ctx: AspectContext): any {
        const route: string = ctx.functionParams.shift();
        return [route.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ''), ...ctx.functionParams];
    }
}
