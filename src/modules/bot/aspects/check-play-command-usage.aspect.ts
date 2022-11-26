import { Operator } from '@bot/types/operator.type';
import { CommandContext } from '@bot/interfaces/command-context.interface';
import { GuildMember } from 'discord.js';
import { ReplyUserException } from '@bot/exceptions/simple-reply.exception';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckPlayCommandUsageAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const cmdCtx: CommandContext = ctx.functionParams[0];
        const operator: Operator = cmdCtx.operator;

        const voiceChannel = (operator.member as GuildMember).voice.channel;
        const permissions = voiceChannel?.permissionsFor(operator.client.user);

        if (!voiceChannel) {
            throw new ReplyUserException(
                cmdCtx, 'Você precisa estar em um canal de voz para ouvir uma música!'
            );
        }

        if (!permissions?.has('Connect') || !permissions.has('Speak')) {
            throw new ReplyUserException(
                cmdCtx, 'Você não tem as permissões necessárias!'
            );
        }
    }
}
