import { EventProps } from '@bot/interfaces/event-props.interface';


export const eventPropsDefault = (): EventProps => {
    return {
        name: undefined,
        once: false,
        rest: false
    };
};
