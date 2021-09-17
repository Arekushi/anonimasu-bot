import { NullCommandAspect } from 'aspects/null-command.aspect';
import { ToLowerCaseParametersAspect } from 'aspects/to-lowercase-parameters.aspect';
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

    private _commands: Collection<string, Command> = new Collection();
    private _events: Collection<string, Event> = new Collection();
    private _aliases: Collection<string, string> = new Collection();
    private _messages: Collection<string, Message> = new Collection();

    get commands() {
        return this._commands;
    }

    get events() {
        return this._events;
    }

    get aliases() {
        return this._aliases;
    }

    get messages() {
        return this._messages;
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

    @UseAspect(Advice.Before, ToLowerCaseParametersAspect)
    @UseAspect(Advice.AfterReturn, NullCommandAspect)
    public getCommand(name: string): any {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    public getMessageArgs(message: Message): string[] {
        const args = message.content
            .slice(this.config.prefix.length)
            .trim()
            .split(/ +/g); 

        this.messages.set(args[0], message);

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