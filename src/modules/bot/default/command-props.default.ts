import { slashDataDefault } from '@bot/default/slash-data.default';
import { defaultCooldown } from '@bot/default/cooldown.default';
import { CommandProps } from '@bot/interfaces/command-props.interface';


export const commandPropsDefault: CommandProps = {
    data: slashDataDefault,
    cooldown: defaultCooldown,
    aliases: [],
    global: true
};
