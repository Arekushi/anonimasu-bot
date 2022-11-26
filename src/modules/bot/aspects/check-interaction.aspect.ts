import { SimpleException } from '@bot/exceptions/simple.exception';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { Interaction, User } from 'discord.js';


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
