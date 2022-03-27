import { AnonimasuBot } from '@client/anonimasu.bot';


export const init = async () => {
    await new AnonimasuBot().init();
};
