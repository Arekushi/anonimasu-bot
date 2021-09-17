import { glob } from 'glob';
import { promisify } from 'util';

export const getFiles = async (thing: string): Promise<string[]> => {
    return await promisify(glob)(`${__dirname}/../${thing}/**/*{.ts,.js}`);
}
