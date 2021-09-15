import { getPropertyByIndex } from 'utils/object.util';
import { getFiles } from 'utils/string.util';
import { Intents, Client, Collection } from 'discord.js';
import { Config } from 'interfaces/config.interface';
import { Command } from 'classes/command.class';
import { Event } from 'classes/event.class';
import ConfigJson from '../config.json';

const FLAGS = Intents.FLAGS;

export abstract class Bot extends Client {
    public config: Config = ConfigJson;

    private _commands: Collection<string, Command> = new Collection();
    private _events: Collection<string, Event> = new Collection();
    private _aliases: Collection<string, string> = new Collection();

    get commands() {
        return this._commands;
    }

    get events() {
        return this._events;
    }

    get aliases() {
        return this._aliases;
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
    }

    public async init(): Promise<void> {
        this.login(this.config.token);

        await this.setup();
    }

    public getCommand(name: string): Command {
        name = name.toLocaleLowerCase();
        return this.commands.get(name) || this._commands.get(this.aliases.get(name));
    }

    private async setup(): Promise<void> {
        const commandsFiles = await getFiles('commands');
        const eventsFiles = await getFiles('events');

        [commandsFiles, eventsFiles].forEach(files => {
            files.forEach(async (value: string) => {
                const request = getPropertyByIndex(await import(value));
                const instance = new request(this);

                if (instance instanceof Command) {
                    this._commands.set(instance.name, instance);
                    instance.aliases.forEach(aliase => this._aliases.set(aliase, instance.name));
                } else {
                    this._events.set(instance.name, instance);
                    this.on(instance.name, instance.run.bind(instance, this));
                }
            });
        });
    }
}
