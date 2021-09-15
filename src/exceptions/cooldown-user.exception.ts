import { Command } from 'classes/command.class';
import { BaseException } from "./base.exception";

export class CooldownException extends BaseException {
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
