import { Entity } from '@database/interfaces/entity.interface';


export interface Server extends Entity {
    id: string;
    locale: string;
}
