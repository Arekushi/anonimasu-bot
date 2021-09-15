import { CooldownException } from 'exceptions/cooldown-user.exception';
import { Command } from 'classes/command.class';
import { Aspect } from 'ts-aspect';

export class CheckCommandUsageAspect implements Aspect {
    execute(command: Command): void {
        const onCooldown = command.cooldownUsers.has(command.message.author.id);

        if (onCooldown) {
            throw new CooldownException(command);
        }
    }
}
