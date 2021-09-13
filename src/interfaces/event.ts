import { Action } from './action';

export interface Event {
    name: string;
    action: Action<any>;
}
