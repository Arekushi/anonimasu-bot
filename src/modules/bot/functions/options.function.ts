import { ArgumentMissingException } from '@bot/exceptions/argument-missing.exception';
import { Option, CommandContext } from '@bot/interfaces/command-context.interface';
import { SlashOption } from '@bot/interfaces/slash-options.interface';


export const getOptions = (
    slashOptions: SlashOption[],
    args: any[]
): Option[] => {
    return slashOptions.map((o, i) => {
        const name = o.name;
        const value = args[i];
        const required = o.required;

        if (required && !value) {
            throw new ArgumentMissingException(name);
        }

        return { name, value };
    });
};

export const get = <T>(ctx: CommandContext, name: string): T => {
    const msgOptions = ctx.options;
    const interactionOptions = ctx.interaction?.options;

    const msgOption = msgOptions?.find(o => o.name === name).value;
    const interactionOption = interactionOptions?.get(name).value;

    return msgOption ?? interactionOption;
};
