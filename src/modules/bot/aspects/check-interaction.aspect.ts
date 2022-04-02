import { SimpleException } from '@bot/exceptions/simple.exception';
import { Interaction, User } from 'discord.js';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckInteractionAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const interaction: Interaction = ctx.functionParams[0];
        const user: User = interaction.user;

        if (!interaction.isCommand()) {
            throw new SimpleException(
                user, 'Essa interação não é um comando'
            );
        }
    }
}
