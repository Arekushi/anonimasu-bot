import { ReplyUserException } from '@exceptions/simple-reply.exception';
import { Bot } from '@classes/bot.class';
import { Command } from '@classes/command.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckPlayCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const command: Command<Bot> = ctx.target;
        const voiceChannel = command.message.member.voice.channel;
        const permissions = voiceChannel?.permissionsFor(command.message.client.user);

        if (!voiceChannel) {
            throw new ReplyUserException(
                command.message, 'Você precisa estar em um canal de voz para ouvir uma música!'
            );
        }

        if (!permissions?.has('CONNECT') || !permissions.has('SPEAK')) {
            throw new ReplyUserException(
                command.message, 'Você não tem as permissões necessárias!'
            );
        }

        if (!ctx.functionParams[1].length) {
            throw new ReplyUserException(
                command.message, 'Você precisa passar um segundo argumento!'
            );
        }
    }
}
