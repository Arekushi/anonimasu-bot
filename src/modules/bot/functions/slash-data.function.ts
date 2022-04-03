import { convertValue } from '@bot/functions/command-options.function';
import { compare } from '@core/utils/string.util';
import { ArgumentMissingException } from '@bot/exceptions/argument-missing.exception';
import { SlashData } from '@bot/interfaces/slash-data.interface';


export const configData = (data: SlashData): SlashData => {
    data.options.sort((a, b) => {
        return (a.required === b.required) ? 0 : a.required ? -1 : 1;
    });

    data.aliases = data.options.map(option => {
        return option.alias;
    });

    data.singleRequired = data.options.filter(o => {
        return o.required;
    }).length <= 1;

    return data;
};

export const createOptions = (
    data: SlashData,
    args: string[]
): any[] => {
    const results = [];
    const { options } = data;

    options.forEach(option => {
        const result = {
            value: undefined,
            name: option.name
        };

        const values = getValues(data, option.alias, args);
        result.value = convertValue(values, option.type);

        if (option.required && !result.value) {
            throw new ArgumentMissingException(result.name);
        }

        args = args.filter(arg => {
            return !values.includes(arg);
        });

        results.push(result);
    });

    return results;
};

const getValues = (
    data: SlashData,
    alias: string,
    args: string[]
): string[] => {
    let adding = false;

    const values = [];
    const hasAlias = args.includes(alias);
    const { aliases, singleRequired } = data;

    for (const arg of args) {
        if (compare(arg, alias)) {
            adding = true;
        } else if ((singleRequired && !hasAlias) || adding) {
            if (aliases.includes(arg)) {
                break;
            }

            values.push(arg);
        }
    }

    return values;
};
