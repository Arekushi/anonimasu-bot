import { Message, CommandInteraction, User } from 'discord.js';


export interface CommandContext {
    message?: Message;
    interaction?: CommandInteraction;
    author?: User;
    args?: any[];
}
