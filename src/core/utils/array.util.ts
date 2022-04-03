export const last = (array: any[]): any => {
    return array[array.length - 1];
};

export const first = (array: any[]): any => {
    return array[0];
};

export const remove = (array: any[], item: any): void => {
    const index = array.indexOf(item);

    if (index !== -1) {
        array.splice(index, 1);
    }
};
