import { Bot } from 'classes/bot.class';
import { Exception } from 'classes/exception.class';
import consola from 'consola';

export const logException = async (e: any, client: Bot, ...args: any[]): Promise<void> => {
    if (e instanceof Exception) {
        await e.action(client, ...args);
    } else if (e instanceof Error) {
        consola.error(e);
    }
}
