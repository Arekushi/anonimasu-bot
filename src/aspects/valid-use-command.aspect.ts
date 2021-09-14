import { Command } from 'classes/command.class';
import { Aspect } from 'ts-aspect';

export class ValidUseCommandAspect implements Aspect {
    execute(...args: any): void {
        const command: Command = args[Object.keys(args)[0]];
        const onCooldown = command.cooldownUsers.has(command.message.author.id);

        if (onCooldown) {
            command.client.logger.warn('Espere sua vez seu baka');
        }
    }
}
