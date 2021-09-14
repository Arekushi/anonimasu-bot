import { ValidUseCommandAspect } from 'aspects/valid-use-command.aspect';
import { Bot } from 'client/abstract-bot';
import { CommandProps } from 'interfaces/command-props.interface';
import { Message, MessageEmbed, MessageOptions, MessagePayload } from 'discord.js';
import { Category } from 'enums/category.enum';
import { UseAspect, Advice } from 'ts-aspect'


export abstract class Command {
    name: string;
    client: Bot;
    category: Category;
    cooldownReply?: number;
    description?: string;
    aliases?: string[];
    message?: Message;
    cooldownToUse: number;
    cooldownUsers: Set<string>;

    constructor(client: Bot, options?: CommandProps) {
        this.client = client;
        this.name = options?.name;
        this.category = options?.category;
        this.cooldownReply = options?.cooldownReply ?? 0;
        this.description = options?.description;
        this.aliases = options?.aliases;
        this.message = options?.message;
        this.cooldownToUse = options?.cooldownToUse ?? 0;
        this.cooldownUsers = new Set();
    }

    protected abstract action(client: Bot, args: string[]): Promise<void>;

    @UseAspect(Advice.Before, ValidUseCommandAspect)
    async run(client: Bot, args: string[]): Promise<void> {
        setTimeout(() => {
            this
                .action(client, args)
                .catch((error: any) => {
                    this.message.channel.send({
                        embeds: [new MessageEmbed({ description: `Error: ${error}` })]
                    });
        })}, this.cooldownReply);

        if (this.cooldownToUse > 0) {
            this.startCooldown();
        }
    }

    async respond(message: string | MessagePayload | MessageOptions) {
        await this.message.channel.send(message);
    }

    setMessage(message: Message) {
        this.message = message;
    }

    startCooldown(): void {
        this.cooldownUsers.add(this.message.author.id);

        setTimeout(() => {
            this.cooldownUsers.delete(this.message.author.id);
        }, this.cooldownToUse);
    }
}
