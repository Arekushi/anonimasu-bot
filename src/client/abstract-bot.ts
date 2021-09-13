import { Message, MessageEmbed, Intents } from 'discord.js';
import { Config } from 'interfaces/config';
import { Event } from 'interfaces/event';
import { Command } from 'interfaces/command';
import { Client, Collection, MessageEmbedOptions } from 'discord.js';
import { promisify } from "util"
import ConfigJson from '../config.json';
import consola from 'consola';
import glob from "glob"

const globPromise = promisify(glob);
const FLAGS = Intents.FLAGS;

export abstract class Bot extends Client {
    logger = consola;
    config: Config = ConfigJson;
    commands: Collection<string, Command> = new Collection();
    events: Collection<string, Event> = new Collection();

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

        await this.setupCommands();
        await this.setupEvents();
    }

    public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
        return new MessageEmbed({ ...options });
    }

    private async setupCommands(): Promise<void> {
        const commandsFiles = await this.getFiles('commands');

        commandsFiles.forEach(async (value: string) => {
            const command: Command = (await import(value)).command;

            this.commands.set(command.name, command);
        });
    }

    private async setupEvents(): Promise<void> {
        const eventsFiles = await this.getFiles('events');

        eventsFiles.forEach(async (value: string) => {
            const event: Event = (await import(value)).event;
            
            this.events.set(event.name, event);
            this.on(event.name, event.action.bind(null, this));
        });
    }

    private async getFiles(thing: string): Promise<string[]> {
        return await globPromise(`${__dirname}/../${thing}/**/*{.ts,.js}`);
    }
}
