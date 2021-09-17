import { Exception } from 'classes/exception.class';
import consola from 'consola';

export const logException = async (e: any): Promise<void> => {
    if (e instanceof Exception) {
        await e.action();
    } else if (e instanceof Error) {
        consola.error(e);
    }
}
