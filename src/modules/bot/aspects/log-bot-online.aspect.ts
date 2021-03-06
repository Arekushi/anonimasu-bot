import consola from 'consola';

import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogBotOnlineAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const client: AnonimasuBot = ctx.target.client;

        consola.success(
            `${client.user.tag} is online!`
        );
    }
}
