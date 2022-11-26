import { MessagePayload, InteractionReplyOptions, MessageReplyOptions, Message } from 'discord.js';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export const reply = async (
    ctx: CommandContext,
    options?: string | MessagePayload | InteractionReplyOptions & MessageReplyOptions
): Promise<any> => {
    if (ctx.operator instanceof Message) {
        ctx.operator.reply(options);
    } else {
        ctx.operator.reply(options);
    }
};
