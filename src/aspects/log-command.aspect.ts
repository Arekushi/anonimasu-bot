import consola from 'consola';

import { Bot } from '@classes/bot.class';
import { Command } from '@classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogCommandAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const command: Command<Bot> = ctx.target;
        const username = command.message.author.username;
        const date = new Date().toTimeString();

        consola.success(
            `O usuário [${username}] usou o comando [${command.name}] - ${date}`
        );
    }
}
