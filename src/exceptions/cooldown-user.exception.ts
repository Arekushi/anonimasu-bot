import { Exception } from "classes/exception.class";
import { Command } from "classes/command.class";

export class CooldownException extends Exception {
    command: Command;

    constructor(command: Command) {
        super();

        this.command = command;
    }

    async action(): Promise<void> {
        const content = `O usuário ${this.command.message.author.username} ` + 
            `não pode usar o comando ${this.command.name} por enquanto. Aguarde.`;

        await this.command.message.reply({ content });
    }
}
