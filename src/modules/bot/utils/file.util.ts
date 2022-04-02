import { glob } from 'glob';
import { promisify } from 'util';
import path from 'path';


export const getFiles = async (thing: string): Promise<string[]> => {
    return await promisify(glob)(`${path.dirname(require.main.filename)}/modules/bot/${thing}/**/*{.ts,.js}`);
};