import toBoolean from 'to-boolean';

import { empty } from '@core/utils/object.util';
import { CommandInteraction } from 'discord.js';
import { CommandOptionType } from '@bot/enums/command-option-type.enum';
import { CommandContext } from '@bot/interfaces/command-context.interface';


export const get = <T>(ctx: CommandContext, name: string, defaultValue?: T): T => {
    const value = getValue(ctx.options ?? (ctx.operator as CommandInteraction).options, name);

    return [value, defaultValue].filter(i => {
        return !empty(i);
    })[0];
};

export const convertValue = (values: string[] | string, type: CommandOptionType) => {
    const value = Array.isArray(values) ? values.join(' ') : values;

    try {
        switch (type) {
            case CommandOptionType.BOOLEAN:
                return toBoolean(value);

            case CommandOptionType.INTEGER:
            case CommandOptionType.NUMBER:
                return Number(value);

            default:
                return value;
        }
    } catch (e) {
        return undefined;
    }
};

const getValue = (
    options: any,
    name: string
): any => {
    if (Array.isArray(options)) {
        return options.find(o => o.name === name)?.value;
    } else {
        return options.get(name)?.value;
    }
};
