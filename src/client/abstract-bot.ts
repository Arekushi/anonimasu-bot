import { Config } from './../interfaces/config';
import { Event } from 'interfaces/event';
import { Command } from 'interfaces/command';
import { Client, Collection } from 'discord.js'

export abstract class Bot extends Client {
    config: Config;
    commands: Collection<string, Command> = new Collection();
    events: Collection<string, Event> = new Collection();

    // start(config: Config): void {
    //     this.config = config;
    //     this.login(this.config.token);
    // }
}
