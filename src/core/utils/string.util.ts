export const toLower = (str: string): string => {
    return str.toLowerCase();
};

export const toUpper = (str: string): string => {
    return str.toUpperCase();
};

export const toArray = (str: string): any[] => {
    return str as unknown as any[];
};
