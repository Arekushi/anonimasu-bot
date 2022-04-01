import { Message } from 'discord.js';
import { ReplyUserException } from '@bot/exceptions/simple-reply.exception';
import { Bot } from '@bot/classes/bot.class';
import { Command } from '@bot/classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckPlayCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const command: Command<Bot> = ctx.target;
        const message: Message = ctx.functionParams[0];

        const voiceChannel = message.member.voice.channel;
        const permissions = voiceChannel?.permissionsFor(message.client.user);

        if (!voiceChannel) {
            throw new ReplyUserException(
                message, 'Você precisa estar em um canal de voz para ouvir uma música!'
            );
        }

        if (!permissions?.has('CONNECT') || !permissions.has('SPEAK')) {
            throw new ReplyUserException(
                message, 'Você não tem as permissões necessárias!'
            );
        }

        if (!ctx.functionParams[1].length) {
            throw new ReplyUserException(
                message, 'Você precisa passar um segundo argumento!'
            );
        }
    }
}
