import { CheckInteractionAspect } from '@bot/aspects/check-interaction.aspect';
import { AnonimasuBot } from '@bot/client/anonimasu.bot';
import { Event } from '@bot/classes/event.class';
import { CommandInteraction } from 'discord.js';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


export class InteractionCreateEvent extends Event<AnonimasuBot> {

    constructor(
        client: AnonimasuBot
    ) {
        super(client, {
            name: 'interactionCreate',
            once: false
        });
    }

    @UseAspect(Advice.Before, CheckInteractionAspect)
    async action(interaction: CommandInteraction): Promise<void> {
        const command = this.client.getCommand(interaction.commandName);
        await command.run({ interaction });
    }
}
