import { Command } from 'classes/command.class';
import { Aspect } from 'ts-aspect';
import consola from 'consola';

export class LogCommandAspect implements Aspect {
    execute(command: Command): void {
        const username = command.message.author.username;
        const date = new Date().toTimeString();

        consola.success(
            `O usuário [${username}] usou o comando [${command.name}] - ${date}`
        );
    }
}
