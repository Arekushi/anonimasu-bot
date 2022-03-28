import consola from 'consola';
import { Exception } from '@core/classes/exception.class';


export const runException = async (e: any, target?: any, ...args: any[]): Promise<void> => {
    if (e instanceof Exception) {
        await e.action({ target, args });
    } else if (e instanceof Error) {
        consola.error(e);
    }
};
