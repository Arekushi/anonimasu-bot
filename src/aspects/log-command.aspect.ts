import { Command } from 'classes/abstracts/command.class';
import { Aspect } from 'ts-aspect';

export class LogCommandAspect implements Aspect {
    execute(command: Command): void {
        const username = command.message.author.username;
        const date = new Date().toTimeString();

        console.log(
            `O usuário [${username}] usou o comando [${command.name}] - ${date}`
        );
    }
}
