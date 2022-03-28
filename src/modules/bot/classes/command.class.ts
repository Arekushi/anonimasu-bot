import { runException } from '@core/utils/exception.util';
import { LogCommandAspect } from '@bot/aspects/log-command.aspect';
import { CheckCommandUsageAspect } from '@bot/aspects/check-command-usage.aspect';
import { Bot } from '@bot/classes/bot.class';
import { CommandProps } from '@bot/interfaces/command-props.interface';
import { Message, MessageOptions, MessagePayload, Collection } from 'discord.js';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import moment, { Moment } from 'moment';


export abstract class Command<T extends Bot> {
    name: string;
    client: T;
    cooldownReply?: number;
    description?: string;
    aliases?: string[];
    message?: Message;
    cooldownToUse: number;
    cooldownUsers: Collection<string, Moment>;

    constructor(client: T, options?: CommandProps) {
        this.client = client;
        this.name = options?.name;
        this.cooldownReply = options?.cooldownReply ?? 0;
        this.description = options?.description;
        this.aliases = options?.aliases;
        this.message = options?.message;
        this.cooldownToUse = options?.cooldownToUse ?? 0;
        this.cooldownUsers = new Collection();
    }

    async respond(message: string | MessagePayload | MessageOptions): Promise<Message> {
        return await this.message.channel.send(message);
    }

    setMessage(message: Message): void {
        this.message = message;
    }

    startCooldown(): void {
        this.cooldownUsers.set(
            this.message.author.id,
            moment().add(this.cooldownToUse, 'milliseconds')
        );
    }

    protected abstract action(client: T, args: string[]): Promise<void>;

    @UseAspect(Advice.Before, CheckCommandUsageAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async run(client: T, args: string[]): Promise<void> {
        setTimeout(async () => {
            try {
                this.action(client, args)
                    .then(() => {
                        if (this.cooldownToUse > 0) {
                            this.startCooldown();
                        }
                    })
                    .catch((err) => {
                        runException(err, client, this.message);
                    });
            } catch (e) {
                await runException(e, client, this.message);
            }
        }, this.cooldownReply);
    }
}
