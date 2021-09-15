import { Exception } from "classes/exception.class";
import { Command } from "classes/command.class";

export class CooldownException extends Exception {
    constructor(response: Command) {
        super(
            response,
            {
                content: `O usuário ${response.message.author.username} ` + 
                    `não pode usar o comando ${response.name} por enquanto. Aguarde.`
            }
        );
    }
}
