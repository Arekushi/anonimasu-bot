import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';


export const guildCommands = async (
    rest: REST,
    commands: any[],
    client: string,
    guild: string
): Promise<void> => {
    await rest.put(
        Routes.applicationGuildCommands(client, guild),
        { body: commands }
    );
};

export const globalCommands = async (
    rest: REST,
    commands: any[],
    client: string
): Promise<void> => {
    await rest.put(
        Routes.applicationCommands(client),
        { body: commands }
    );
};
