import toBoolean from 'to-boolean';

import { isEmpty } from '@core/utils/array.util';
import { ApplicationCommandOptionType } from 'discord.js';
import { SlashCommandOption } from '@bot/interfaces/slash-command-options.interface';
import { Option } from '@bot/interfaces/command-context.interface';
import { toLower } from '@core/utils/string.util';
import { ArgumentMissingException } from '@bot/exceptions/argument-missing.exception';
import { SlashCommandData } from '@bot/interfaces/slash-command-data.interface';


export const createOptions = (
    data: SlashCommandData,
    args: string[]
): Option[] => {
    const allAliases = data.options.flatMap(o => o.aliases);
    const options = [];

    for (const slashOption of data.options) {
        const option = {
            name: slashOption.name,
            value: getValuesFromOptions(slashOption, allAliases, args)
        };

        if (slashOption.required && isEmpty(option.value)) {
            throw new ArgumentMissingException(option.name);
        }

        args = args.filter(item => {
            return !option.value.includes(item)
                && !slashOption.aliases.includes(item);
        });

        option.value = convertValue(option.value, slashOption.type);
        options.push(option);
    }

    return options;
};

const getValuesFromOptions = (
    option: SlashCommandOption,
    allAliases: string[],
    args: string[]
): any[] => {
    const { aliases } = option;
    const hasAlias = args.some(arg => aliases.includes(arg));
    const values = [];

    for (const arg of args) {
        if (aliases.includes(toLower(arg))) {
            continue;
        } else if (!hasAlias && !values.length) {
            values.push(arg);
            break;
        } else {
            if (allAliases.includes(toLower(arg))) {
                break;
            }

            values.push(arg);
        }
    }

    return values;
};

const convertValue = (
    values: string[],
    type: ApplicationCommandOptionType
): any => {
    const value = values.join(' ');

    try {
        switch (type) {
            case ApplicationCommandOptionType.Boolean:
                return toBoolean(value);

            case ApplicationCommandOptionType.Integer:
            case ApplicationCommandOptionType.Number:
                return Number(value);

            case ApplicationCommandOptionType.String:
                return value;

            default:
                return value;
        }
    } catch (e) {
        return undefined;
    }
};
