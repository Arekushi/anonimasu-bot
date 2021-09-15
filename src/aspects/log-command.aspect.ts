import { Command } from 'classes/command.class';
import { Aspect } from 'ts-aspect';

export class LogCommandAspect implements Aspect {
    execute(command: Command): void {
        const username = command.message.author.username;
        const logger = command.client.logger;
        const date = new Date().toTimeString();

        logger.log(
            `O usuário [${username}] usou o comando [${command.name}] - ${date}`
        );
    }
}
