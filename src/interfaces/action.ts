import { Message, Client } from 'discord.js';

export interface ActionCommand {
    (client: Client, message: Message, args: string[]): Promise<any>
}

export interface ActionEvent {
    (client: Client, ...args: any[]): Promise<any>
}
