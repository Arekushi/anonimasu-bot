import { RESTOptions } from '@discordjs/rest';


export interface Config {
    token: string;
    prefix: string;
    devGuild?: string | undefined;
    devClient?: string | undefined;
    restOptions?: RESTOptions;
}
