
import config from 'config';

import { REST, Client, Collection, ClientOptions } from 'discord.js';
import { NonExistentCommandException } from '@bot/exceptions/non-existent-command.exception';
import { NullReturnAspect } from '@core/aspects/null-return.aspect';
import { Case } from '@bot/enums/string-case.enum';
import { ToCaseParametersAspect } from '@core/aspects/to-case-parameters.aspect';
import { getPropertyByIndex } from '@core/utils/object.util';
import { getFiles } from '@bot/utils/file.util';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';
import { Config } from '@bot/interfaces/config.interface';
import { Command } from '@bot/classes/command.class';
import { Event } from '@bot/classes/event.class';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { LogSlashCommandsAspect } from '@bot/aspects/log-slash-commands.aspect';
import { LogSetupAspect } from '@bot/aspects/log-setup.aspect';
import { guildCommands } from '@bot/functions/rest-api.function';


export abstract class Bot extends Client {

    #config: Config;
    #commands: Collection<string, Command<Bot>>;
    #commandsJSON: any[];

    #events: Collection<string, Event<Bot>>;
    #aliases: Collection<string, string>;
    #restAPI: REST;

    get config(): Config {
        return this.#config;
    }

    get commands(): Collection<string, Command<Bot>> {
        return this.#commands;
    }

    get commandsJSON(): any[] {
        return this.#commandsJSON;
    }

    get events(): Collection<string, Event<Bot>> {
        return this.#events;
    }

    get aliases(): Collection<string, string> {
        return this.#aliases;
    }

    get restAPI(): REST {
        return this.#restAPI;
    }

    constructor(
        options: ClientOptions
    ) {
        super(options);

        this.#commands = new Collection();
        this.#commandsJSON = [];
        this.#events = new Collection();
        this.#aliases = new Collection();

        this.#config = {
            prefix: config.get('prefix'),
            restOptions: config.get('bot.rest-options'),
            token: process.env.TOKEN,
            devGuild: process.env.DEV_GUILD_ID,
            devClient: process.env.DEV_CLIENT_ID
        };
    }

    public async init(): Promise<void> {
        this.login(this.config.token).then(async () => {
            await this.setup();
        });
    }

    @UseAspect(Advice.Before, ToCaseParametersAspect, Case.LOWER)
    @UseAspect(Advice.AfterReturn, NullReturnAspect, new NonExistentCommandException())
    public getCommand(name: string): Command<Bot> {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    @UseAspect(Advice.After, LogSetupAspect)
    private async setup(): Promise<void> {
        const commandsFiles = await getFiles('commands');
        const eventsFiles = await getFiles('events');

        for (const files of  [commandsFiles, eventsFiles]) {
            for (const file of files) {
                const imported = await import(file);
                const request = getPropertyByIndex(imported);
                const instance = new request(this);

                if (instance instanceof Command) {
                    await this.setupCommand(instance);
                } else {
                    this.setupEvent(instance);
                }
            }
        }
    }

    private async setupCommand(command: Command<Bot>): Promise<void> {
        this.#commands.set(command.data.name, command);
        this.#commandsJSON.push(command.data);

        command.aliases.forEach(aliase => {
            this.aliases.set(aliase, command.data.name);
        });

        // await this.application.commands.set(this.#commandsJSON);
    }

    private setupEvent(event: Event<Bot>): void {
        this.#events.set(event.name, event);

        if (event.rest) {
            if (event.once) {
                this.rest.once(event.name, event.run.bind(event, this));
            } else {
                this.rest.on(event.name, event.run.bind(event, this));
            }
        } else {
            if (event.once) {
                this.once(event.name, event.run.bind(event, this));
            } else {
                this.on(event.name, event.run.bind(event, this));
            }
        }
    }

    // @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    // @UseAspect(Advice.After, LogSlashCommandsAspect)
    // private async RestAPI(): Promise<void> {
    //     const { devClient, devGuild, token, restOptions } = this.config;
    //     this.#restAPI = new REST(restOptions).setToken(token);

    //     await guildCommands(
    //         this.restAPI,
    //         this.commandsJSON,
    //         devClient,
    //         devGuild
    //     );
    // }

}
