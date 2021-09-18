import { NonExistentCommandException } from 'exceptions/non-existent-command.exception';
import { NullReturnAspect } from 'aspects/null-return.aspect';
import { Case } from 'enums/string-case.enum';
import { ToCaseParametersAspect } from 'aspects/to-case-parameters.aspect';
import { getPropertyByIndex } from 'utils/object.util';
import { getFiles } from 'utils/string.util';
import { Intents, Client, Collection, Message } from 'discord.js';
import { Config } from 'interfaces/config.interface';
import { Command } from 'classes/command.class';
import { Event } from 'classes/event.class';
import ConfigJson from '../config.json';
import { UseAspect, Advice } from 'ts-aspect';

const FLAGS = Intents.FLAGS;

export abstract class Bot extends Client {
    public config: Config = ConfigJson;

    private _commands: Collection<string, Command<Bot>>;
    private _events: Collection<string, Event<Bot>>;
    private _aliases: Collection<string, string>;

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

        this._commands = new Collection();
        this._events = new Collection();
        this._aliases = new Collection();
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
            files.forEach(async (value: string) => {
                const request = getPropertyByIndex(await import(value));
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
