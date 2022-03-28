import config from 'config';

import { NonExistentCommandException } from '@bot/exceptions/non-existent-command.exception';
import { NullReturnAspect } from '@core/aspects/null-return.aspect';
import { Case } from '@bot/enums/string-case.enum';
import { ToCaseParametersAspect } from '@core/aspects/to-case-parameters.aspect';
import { getPropertyByIndex } from '@core/utils/object.util';
import { getFiles } from '@core/utils/string.util';
import { Intents, Client, Collection, Message } from 'discord.js';
import { Config } from '@bot/interfaces/config.interface';
import { Command } from '@bot/classes/command.class';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';


const FLAGS = Intents.FLAGS;


export abstract class Bot extends Client {
    #config: Config;
    #commands: Collection<string, Command<Bot>>;
    #events: Collection<string, Event<Bot>>;
    #aliases: Collection<string, string>;

    get config(): Config {
        return this.#config;
    }

    get commands(): Collection<string, Command<Bot>> {
        return this.#commands;
    }

    get events(): Collection<string, Event<Bot>> {
        return this.#events;
    }

    get aliases(): Collection<string, string> {
        return this.#aliases;
    }

    constructor() {
        super({
            intents: [
                FLAGS.GUILDS,
                FLAGS.DIRECT_MESSAGES,
                FLAGS.DIRECT_MESSAGE_REACTIONS,
                FLAGS.GUILD_INVITES,
                FLAGS.GUILD_VOICE_STATES,
                FLAGS.GUILD_MEMBERS,
                FLAGS.GUILD_MESSAGES,
                FLAGS.GUILD_PRESENCES
            ]
        });

        this.#commands = new Collection();
        this.#events = new Collection();
        this.#aliases = new Collection();

        this.#config = {
            prefix: config.get('prefix'),
            token: process.env.TOKEN
        };
    }

    public async init(): Promise<void> {
        this.login(this.config.token);
        await this.setup();
    }

    @UseAspect(Advice.Before, ToCaseParametersAspect, Case.LOWER)
    @UseAspect(Advice.AfterReturn, NullReturnAspect, new NonExistentCommandException())
    public getCommand(name: string): Command<Bot> {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    public getMessageArgs(message: Message): string[] {
        const args = message.content
            .slice(this.config.prefix.length)
            .trim()
            .split(/ +/g);

        return args;
    }

    private async setup(): Promise<void> {
        const commandsFiles = await getFiles('commands');
        const eventsFiles = await getFiles('events');

        [commandsFiles, eventsFiles].forEach(files => {
            files.forEach(async (file: string) => {
                const imported = await import(file);
                const request = getPropertyByIndex(imported);
                const instance = new request(this);

                if (instance instanceof Command) {
                    this.commands.set(instance.name, instance);
                    instance.aliases.forEach(aliase => this.aliases.set(aliase, instance.name));
                } else {
                    this.events.set(instance.name, instance);
                    this.on(instance.name, instance.run.bind(instance, this));
                }
            });
        });
    }

}
