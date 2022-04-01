import { defaultCooldown } from '@bot/default/cooldown.default';
import { CommandProps } from '@bot/interfaces/command-props.interface';


export const commandPropsDefault: CommandProps = {
    data: {
        name: undefined,
        description: undefined,
        defaultPermission: true
    },
    cooldown: defaultCooldown,
    aliases: [],
    global: true
};
