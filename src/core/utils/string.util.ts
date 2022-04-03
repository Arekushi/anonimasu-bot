export const toLower = (str: string): string => {
    return str.toLowerCase();
};

export const toUpper = (str: string): string => {
    return str.toUpperCase();
};

export const toArray = (str: string): any[] => {
    return str as unknown as any[];
};

export const compare = (a: string, b: string): boolean => {
    return a.localeCompare(b, undefined, { sensitivity: 'accent'}) === 0;
};

export const isEmptyOrSpaces = (str: string) => {
    return str === null || str === undefined || str.match(/^ *$/) !== null;
};
