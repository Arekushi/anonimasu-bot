import { empty } from '@core/utils/object.util';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export const get = (ctx: CommandContext, name: string, defaultValue?: any): any => {
    const msgOptions = ctx.options;
    const interactionOptions = ctx.interaction?.options;

    const msgValue = msgOptions?.find(o => o.name === name)?.value;
    const interactionValue = (interactionOptions?.get(name)?.value) as any;

    const result = [msgValue, interactionValue, defaultValue].filter(i => {
        return !empty(i);
    })[0];

    return result;
};
