import consola from 'consola';

import { Bot } from '@bot/classes/bot.class';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export class LogSetupAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<void> {
        consola.success(
            `Setup realizado com sucesso!`
        );
    }
}
