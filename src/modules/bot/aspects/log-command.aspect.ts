import { Message } from 'discord.js';
import consola from 'consola';

import { Bot } from '@bot/classes/bot.class';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogCommandAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const command: Command<Bot> = ctx.target;
        const message: Message = ctx.functionParams[0];
        const username = message.author.username;
        const date = new Date().toTimeString();

        consola.success(
            `O usuário [${username}] usou o comando [${command.data.name}] - ${date}`
        );
    }
}
