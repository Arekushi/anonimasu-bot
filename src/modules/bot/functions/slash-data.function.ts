import { compare } from '@core/utils/string.util';
import { ArgumentMissingException } from '@bot/exceptions/argument-missing.exception';
import { Option } from '@bot/interfaces/command-context.interface';
import { SlashData } from '@bot/interfaces/slash-data.interface';


export const configData = (data: SlashData): SlashData => {
    data.options.sort((a, b) => {
        return (a.required === b.required) ? 0 : a.required ? -1 : 1;
    });

    data.aliases = data.options.map(option => {
        return option.alias;
    });

    return data;
};

export const getOptions = (
    data: SlashData,
    args: string[]
): Option[] => {
    const separatedArgs = separateArgs(data, args);

    return separatedArgs.map(arg => {
        const option = arg.option;
        const value = arg.value;
        const name = option.name;
        const required = option.required;

        if (required && !value) {
            throw new ArgumentMissingException(name);
        }

        return { name, value };
    });
};

const separateArgs = (
    data: SlashData,
    args: string[]
): any[] => {
    const results = [];
    const aliases = data.aliases;
    const options = data.options;

    options.forEach(option => {
        results.push({
            values: [],
            value: undefined,
            option
        });

        let adding = false;
        const result = results.at(-1);
        const alias = result.option.alias;

        const hasAlias = args.includes(alias);
        const singleRequired = options.filter(o => o.required).length <= 1;

        for (const arg of args) {
            if (compare(arg, alias)) {
                adding = true;
            } else if ((singleRequired && !hasAlias) || adding) {
                if (aliases.includes(arg)) {
                    break;
                }

                result.values.push(arg);
            }
        }

        result.value = result.values.join(' ');

        args = args.filter(arg => {
            return !result.values.includes(arg);
        });
    });

    return results;
};
