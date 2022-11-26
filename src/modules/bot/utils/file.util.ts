import { glob } from 'glob';
import { promisify } from 'util';


export const getFiles = async (thing: string): Promise<string[]> => {
    return await promisify(glob)(`**/src/modules/bot/${thing}/**/*{.ts,.js}`);
};
