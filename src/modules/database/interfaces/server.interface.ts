import { Entity } from '@database/interfaces/entity.interface';


export interface Server extends Entity {
    discordId: string;
    locale?: string;
}
