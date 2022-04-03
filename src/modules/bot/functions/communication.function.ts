import { MessagePayload, MessageOptions, InteractionReplyOptions } from 'discord.js';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export const reply = async (
    ctx: CommandContext,
    options: string | MessagePayload | MessageOptions | InteractionReplyOptions
): Promise<any> => {
    return await ctx.operator.reply(options);
};
